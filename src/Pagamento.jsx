import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import voltar from './assets/voltar.png'
import { useLoja, formatar } from './Contextos'
import s from './Loja.module.css'

const so = (v) => v.replace(/\D/g, '')

const mascaras = {
  cpf: (v) =>
    so(v).slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'),
  telefone: (v) => {
    const d = so(v).slice(0, 11)
    if (d.length <= 2) return d
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  },
  cep: (v) => so(v).slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2'),
  cartao: (v) => so(v).slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 '),
  validade: (v) => so(v).slice(0, 4).replace(/(\d{2})(\d)/, '$1/$2'),
  cvv: (v) => so(v).slice(0, 4),
}

function cpfValido(c) {
  const d = so(c)
  if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false
  const dv = (n) => {
    let soma = 0
    for (let i = 0; i < n; i++) soma += Number(d[i]) * (n + 1 - i)
    const r = (soma * 10) % 11
    return r === 10 ? 0 : r
  }
  return dv(9) === Number(d[9]) && dv(10) === Number(d[10])
}

function luhn(n) {
  const d = so(n)
  if (d.length < 13) return false
  let soma = 0, alt = false
  for (let i = d.length - 1; i >= 0; i--) {
    let x = Number(d[i])
    if (alt) { x *= 2; if (x > 9) x -= 9 }
    soma += x
    alt = !alt
  }
  return soma % 10 === 0
}

function validadeOk(v) {
  const [mm, aa] = v.split('/').map(Number)
  if (!mm || !aa || mm < 1 || mm > 12) return false
  const fim = new Date(2000 + aa, mm, 1) // primeiro dia do mês seguinte
  return fim > new Date()
}

const inicial = {
  nome: '', cpf: '', email: '', telefone: '',
  cep: '', endereco: '', numero: '', cidade: '', uf: '',
  metodo: 'pix',
  cartao: '', titular: '', validade: '', cvv: '', parcelas: '1',
}

function Pagamento() {
  const navigate = useNavigate()
  const { itens, usuario, total, limpar } = useLoja()
  const [d, setD] = useState({ ...inicial, nome: usuario?.nome ?? '', email: usuario?.email ?? '' })
  const [erros, setErros] = useState({})
  const [pedido, setPedido] = useState(null)
  const [copiado, setCopiado] = useState(false)

  if (!usuario) return <Navigate to="/login" state={{ from: '/pagamento' }} replace />
  if (itens.length === 0 && !pedido) return <Navigate to="/carrinho" replace />

  const totalFinal = d.metodo === 'pix' ? total * 0.95 : total

  const muda = (campo) => (e) => {
    const valor = mascaras[campo] ? mascaras[campo](e.target.value) : e.target.value
    setD({ ...d, [campo]: valor })
  }

  function validar() {
    const e = {}
    if (d.nome.trim().split(' ').length < 2) e.nome = 'Informe nome e sobrenome.'
    if (!cpfValido(d.cpf)) e.cpf = 'CPF inválido.'
    if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = 'E-mail inválido.'
    if (so(d.telefone).length < 10) e.telefone = 'Telefone inválido.'
    if (so(d.cep).length !== 8) e.cep = 'CEP deve ter 8 dígitos.'
    if (!d.endereco.trim()) e.endereco = 'Informe o endereço.'
    if (!d.numero.trim()) e.numero = 'Informe o número.'
    if (!d.cidade.trim()) e.cidade = 'Informe a cidade.'
    if (d.uf.trim().length !== 2) e.uf = 'Use a sigla (ex.: PR).'
    if (d.metodo === 'cartao') {
      if (!luhn(d.cartao)) e.cartao = 'Número de cartão inválido.'
      if (d.titular.trim().length < 3) e.titular = 'Informe o nome impresso no cartão.'
      if (!validadeOk(d.validade)) e.validade = 'Validade inválida.'
      if (d.cvv.length < 3) e.cvv = 'CVV inválido.'
    }
    return e
  }

  function finalizar(ev) {
    ev.preventDefault()
    const e = validar()
    setErros(e)
    if (Object.keys(e).length > 0) return
    // Aqui entraria a chamada ao gateway de pagamento (Mercado Pago, Stripe, Pagar.me...).
    // Dados de cartão nunca devem ser salvos nem enviados ao seu próprio servidor.
    setPedido({
      numero: Math.floor(100000 + Math.random() * 900000),
      metodo: d.metodo,
      total: totalFinal,
      parcelas: Number(d.parcelas),
    })
    limpar()
  }

  if (pedido) {
    const codigoPix = `PIX-DEMO-${pedido.numero}`
    return (
      <div className={s.all}>
        <div className={s.sucesso}>
          <h1>Pedido #{pedido.numero} recebido</h1>
          <p>Total: {formatar(pedido.total)}</p>
          {pedido.metodo === 'pix' && (
            <>
              <p>Copie o código abaixo e pague no app do seu banco:</p>
              <code className={s.pix}>{codigoPix}</code>
              <button className={s.botaoSec} onClick={() => {
                navigator.clipboard?.writeText(codigoPix)
                setCopiado(true)
              }}>{copiado ? 'Copiado' : 'Copiar código'}</button>
            </>
          )}
          {pedido.metodo === 'boleto' && <p>O boleto será enviado para {d.email}. Vence em 3 dias úteis.</p>}
          {pedido.metodo === 'cartao' && (
            <p>Pagamento em {pedido.parcelas}x de {formatar(pedido.total / pedido.parcelas)} no cartão.</p>
          )}
          <Link to="/produtos" className={s.botao}>Continuar comprando</Link>
        </div>
      </div>
    )
  }

  const Campo = ({ id, label, ...props }) => (
    <div className={s.grupo}>
      <label htmlFor={id}>{label}</label>
      <input id={id} className={s.campo} value={d[id]} onChange={muda(id)} {...props} />
      {erros[id] && <span className={s.erro}>{erros[id]}</span>}
    </div>
  )

  return (
    <div className={s.all}>
      <img src={voltar} className={s.voltar} alt="Voltar"
        onClick={() => navigate('/carrinho')} style={{ cursor: 'pointer' }} />
      <h1 className={s.titulo}>Pagamento</h1>

      <form className={s.layout} onSubmit={finalizar} noValidate>
        <div className={s.lista}>
          <fieldset className={s.bloco}>
            <legend>Seus dados</legend>
            {Campo({ id: 'nome', label: 'Nome completo', autoComplete: 'name' })}
            {Campo({ id: 'cpf', label: 'CPF', inputMode: 'numeric', placeholder: '000.000.000-00' })}
            {Campo({ id: 'email', label: 'E-mail', type: 'email', autoComplete: 'email' })}
            {Campo({ id: 'telefone', label: 'Telefone', inputMode: 'tel', placeholder: '(41) 99999-9999' })}
          </fieldset>

          <fieldset className={s.bloco}>
            <legend>Endereço de entrega</legend>
            {Campo({ id: 'cep', label: 'CEP', inputMode: 'numeric', placeholder: '00000-000' })}
            {Campo({ id: 'endereco', label: 'Rua / Avenida' })}
            {Campo({ id: 'numero', label: 'Número' })}
            {Campo({ id: 'cidade', label: 'Cidade' })}
            {Campo({ id: 'uf', label: 'UF', maxLength: 2 })}
          </fieldset>

          <fieldset className={s.bloco}>
            <legend>Forma de pagamento</legend>
            <div className={s.radioGrupo}>
              {[['pix', 'Pix (5% de desconto)'], ['cartao', 'Cartão de crédito'], ['boleto', 'Boleto']].map(([v, t]) => (
                <label key={v}>
                  <input type="radio" name="metodo" value={v} checked={d.metodo === v}
                    onChange={() => setD({ ...d, metodo: v })} /> {t}
                </label>
              ))}
            </div>

            {d.metodo === 'cartao' && (
              <>
                {Campo({ id: 'cartao', label: 'Número do cartão', inputMode: 'numeric', autoComplete: 'cc-number', placeholder: '0000 0000 0000 0000' })}
                {Campo({ id: 'titular', label: 'Nome impresso no cartão', autoComplete: 'cc-name' })}
                {Campo({ id: 'validade', label: 'Validade', inputMode: 'numeric', autoComplete: 'cc-exp', placeholder: 'MM/AA' })}
                {Campo({ id: 'cvv', label: 'CVV', inputMode: 'numeric', autoComplete: 'cc-csc' })}
                <div className={s.grupo}>
                  <label htmlFor="parcelas">Parcelas</label>
                  <select id="parcelas" className={s.campo} value={d.parcelas}
                    onChange={(e) => setD({ ...d, parcelas: e.target.value })}>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n}x de {formatar(total / n)} sem juros</option>
                    ))}
                  </select>
                </div>
              </>
            )}
            {d.metodo === 'pix' && <p>O código Pix será exibido após confirmar o pedido.</p>}
            {d.metodo === 'boleto' && <p>O boleto será enviado para o seu e-mail após confirmar o pedido.</p>}
          </fieldset>
        </div>

        <aside className={s.resumo}>
          <h2>Seu pedido</h2>
          {itens.map((i) => (
            <div className={s.linha} key={i.id}>
              <span>{i.qtd}x {i.nome}</span><span>{formatar(i.preco * i.qtd)}</span>
            </div>
          ))}
          {d.metodo === 'pix' && (
            <div className={s.linha}><span>Desconto Pix</span><span>- {formatar(total * 0.05)}</span></div>
          )}
          <div className={`${s.linha} ${s.total}`}><span>Total</span><span>{formatar(totalFinal)}</span></div>
          <button type="submit" className={s.botao}>Confirmar pedido</button>
        </aside>
      </form>
    </div>
  )
}

export default Pagamento
