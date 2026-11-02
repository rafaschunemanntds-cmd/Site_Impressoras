import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import voltar from './assets/voltar.png'
import { useLoja, formatar } from './Contextos'
import s from './Loja.module.css'

function Carrinho() {
  const navigate = useNavigate()
  const { itens, alterarQtd, remover, aplicarCupom, cupom, subtotal, desconto, frete, total } = useLoja()
  const [codigo, setCodigo] = useState('')
  const [msg, setMsg] = useState('')

  function usarCupom(e) {
    e.preventDefault()
    setMsg(aplicarCupom(codigo) ? 'Cupom aplicado.' : 'Cupom inválido.')
  }

  return (
    <div className={s.all}>
      <img src={voltar} className={s.voltar} alt="Voltar"
        onClick={() => navigate('/produtos')} style={{ cursor: 'pointer' }} />
      <h1 className={s.titulo}>Seu carrinho</h1>

      {itens.length === 0 ? (
        <div className={s.vazio}>
          <p>Seu carrinho está vazio.</p>
          <Link to="/produtos" className={s.botao}>Ver produtos</Link>
        </div>
      ) : (
        <div className={s.layout}>
          <div className={s.lista}>
            {itens.map((i) => (
              <div className={s.item} key={i.id}>
                <img src={i.imagem} alt={i.nome} className={s.img} />
                <div className={s.info}>
                  <strong>{i.nome}</strong>
                  <span>{formatar(i.preco)}</span>
                  <label>
                    Quantidade:{' '}
                    <input className={s.qtd} type="number" min="1" max="99" value={i.qtd}
                      onChange={(e) => alterarQtd(i.id, parseInt(e.target.value) || 1)} />
                  </label>
                </div>
                <div className={s.direita}>
                  <strong>{formatar(i.preco * i.qtd)}</strong>
                  <button className={s.remover} onClick={() => remover(i.id)}>Remover</button>
                </div>
              </div>
            ))}
          </div>

          <aside className={s.resumo}>
            <h2>Resumo</h2>
            <form className={s.cupomLinha} onSubmit={usarCupom}>
              <input className={s.campo} placeholder="Cupom de desconto"
                value={codigo} onChange={(e) => setCodigo(e.target.value)} />
              <button type="submit" className={s.botaoSec}>Aplicar</button>
            </form>
            {msg && <small>{msg}</small>}
            <div className={s.linha}><span>Subtotal</span><span>{formatar(subtotal)}</span></div>
            {cupom && <div className={s.linha}><span>Cupom {cupom}</span><span>- {formatar(desconto)}</span></div>}
            <div className={s.linha}>
              <span>Frete</span>
              <span>{frete === 0 ? 'Grátis' : formatar(frete)}</span>
            </div>
            <div className={`${s.linha} ${s.total}`}><span>Total</span><span>{formatar(total)}</span></div>
            <small>Frete grátis em compras a partir de R$ 500,00. Cupons de teste: 3D10 e BEMVINDO.</small>
            <button className={s.botao} onClick={() => navigate('/pagamento')}>Ir para o pagamento</button>
          </aside>
        </div>
      )}
    </div>
  )
}

export default Carrinho
