import { Link, useNavigate } from 'react-router-dom'
import acessorios from './assets/acessorios.png'
import filamentos from './assets/filamentos.png'
import impressoras from './assets/impressoras.png'
import resinas from './assets/resinas.png'
import pecas from './assets/pecas.png'
import voltar from './assets/voltar.png'
import { useLoja } from './Contextos'
import s from './Produtos.module.css'

function Produtos() {
  const navigate = useNavigate()
  const { quantidadeTotal, usuario, sair } = useLoja()

  return (
    <div className={s.all}>
      <div className={s.topo}>
        <img
          src={voltar}
          className={s.voltar}
          alt="Voltar"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        />
        <div className={s.conta}>
          {usuario ? (
            <>
              <span>Olá, {usuario.nome}</span>
              <button className={s.sair} onClick={sair}>Sair</button>
            </>
          ) : (
            <Link to="/login" className={s.link}>Entrar</Link>
          )}
          <Link to="/carrinho" className={s.link}>Carrinho ({quantidadeTotal})</Link>
        </div>
      </div>

      <div className={s.produtos_decima}>
        <img src={impressoras} className={s.impressoras} alt="Impressora"
          onClick={() => navigate('/impressora')} style={{ cursor: 'pointer' }} />
        <img src={resinas} className={s.resinas} alt="Resina"
          onClick={() => navigate('/resina')} style={{ cursor: 'pointer' }} />
        <img src={filamentos} className={s.filamentos} alt="Filamento"
          onClick={() => navigate('/filamento')} style={{ cursor: 'pointer' }} />
      </div>
      <br /><br /><br />
      <div className={s.produtos_debaixo}>
        <img src={pecas} className={s.pecas} alt="Pecas"
          onClick={() => navigate('/pecas')} style={{ cursor: 'pointer' }} />
        <img src={acessorios} className={s.acessorios} alt="Acessorios"
          onClick={() => navigate('/acessorios')} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  )
}

export default Produtos
