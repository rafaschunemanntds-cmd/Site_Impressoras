import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import voltar from './assets/voltar.png'
import { categorias } from './dados'
import { useLoja, formatar } from './Contextos'
import s from './Categoria.module.css'

// Uma única página que atende Impressora, Resina, Filamento, Peças e Acessórios.
function Categoria({ slug }) {
  const navigate = useNavigate()
  const { adicionar, quantidadeTotal } = useLoja()
  const categoria = categorias[slug]

  const [busca, setBusca] = useState('')
  const [ordem, setOrdem] = useState('padrao')
  const [qtds, setQtds] = useState({})
  const [aviso, setAviso] = useState('')

  const lista = useMemo(() => {
    const r = categoria.produtos.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()))
    if (ordem === 'menor') return [...r].sort((a, b) => a.preco - b.preco)
    if (ordem === 'maior') return [...r].sort((a, b) => b.preco - a.preco)
    return r
  }, [categoria, busca, ordem])

  const qtd = (id) => qtds[id] ?? 1
  const mudarQtd = (id, v) =>
    setQtds({ ...qtds, [id]: Math.min(99, Math.max(1, parseInt(v) || 1)) })

  function comprar(p) {
    adicionar(p, qtd(p.id))
    setAviso(`${qtd(p.id)}x ${p.nome} adicionado ao carrinho`)
    setTimeout(() => setAviso(''), 2500)
  }

  return (
    <div className={s.all}>
      <div className={s.topo}>
        <img src={voltar} className={s.voltar} alt="Voltar"
          onClick={() => navigate('/produtos')} style={{ cursor: 'pointer' }} />
        <Link to="/carrinho" className={s.carrinhoLink}>
          Carrinho ({quantidadeTotal})
        </Link>
      </div>

      <h1 className={s.titulo}>{categoria.titulo}</h1>

      <div className={s.filtros}>
        <input className={s.campo} type="search" placeholder="Buscar produto"
          value={busca} onChange={(e) => setBusca(e.target.value)} />
        <select className={s.campo} value={ordem} onChange={(e) => setOrdem(e.target.value)}>
          <option value="padrao">Ordenar por</option>
          <option value="menor">Menor preço</option>
          <option value="maior">Maior preço</option>
        </select>
      </div>

      {aviso && <p className={s.aviso} role="status">{aviso}</p>}

      <div className={s.impressoras}>
        {lista.length === 0 && <p className={s.texto}>Nenhum produto encontrado para "{busca}".</p>}
        {lista.map((p) => (
          <div className={s.espaco} key={p.id}>
            <img src={p.imagem} className={s.imagem} alt={p.nome} />
            <div className={s.wrapInfo}>
              <h3>{p.nome}</h3>
              <h2>{formatar(p.preco)}</h2>
              <label className={s.luide}>
                Quantidade:{' '}
                <input className={s.quant} type="number" min="1" max="99"
                  value={qtd(p.id)} onChange={(e) => mudarQtd(p.id, e.target.value)} />
              </label>
              <button className={s.add} onClick={() => comprar(p)}>
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className={s.subtitulo}>Confira nossas Impressoras 3D. Novas ofertas todos os dias.</h2>
      <p className={s.texto}>
        <strong>Como funcionam nossas impressoras 3D:</strong><br /><br />
        O processo de impressão 3D começa com um modelo digital 3D, geralmente criado
        em softwares CAD, como Tinkercad, Fusion 360, Blender, ou baixado de plataformas
        como o Thingiverse. Nossas impressoras têm área de impressão de 400 mm x 400 mm x 450 mm.
      </p>
    </div>
  )
}

export default Categoria
