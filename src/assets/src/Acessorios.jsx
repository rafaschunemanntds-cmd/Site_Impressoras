import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import voltar from './assets/voltarPreto.png'
import impressoraUm from './assets/acessoriosUm.png'
import impressoraDois from './assets/acessoriosDois.png'
import s from './Acessorios.module.css'

function Acessorios() {
  const navigate = useNavigate()

  return (
      <div className={s.all}>
        <img
          src={voltar}
          className={s.voltar}
          alt="Voltar"
          onClick={() => navigate('/produtos')}
          style={{ cursor: 'pointer' }}
        />
        <br/><br/>
        <div className={s.impressoras}>
          <div className={s.espacoUm}> 
            <img src={impressoraUm} 
            className={s.impressoraUm}
            alt="Impressora" />
            <div className={s.wrapInfo}>     
              <h2>R$ 7.099,00</h2> 
              <Link to="/login" className={s.add}>
                Adicionar ao Carrinho
              </Link>     
              <br/>
              <div className={s.luide}>
                Quantidade: <input className={s.quant} type="number"/>
              </div>
            </div>
          </div>
          <br /><br />
          <div className={s.espacoDois}>
            <img src={impressoraDois} 
            className={s.impressoraDois}
            alt="Impressora" />
            <div className={s.wrapInfo}>
              <h2>R$ 2.099,00</h2>
              <Link to="/login" className={s.add}>
                Adicionar ao Carrinho
              </Link>
              <br/>
              <div className={s.luide}>
                Quantidade: <input className={s.quant} type="number"/>
              </div>
            </div>
          </div>
        </div>
        <br /><br /><br /><br />
        <h1 className={s.titulo}>Confira nossas Impressoras 3D. Novas ofertas todos os dias.</h1><br />
        <p className={s.texto}><strong>Como funcionam nossas impressoras 3D :</strong><br/><br />
          O processo de impressão 3D começa com um modelo digital 3D, geralmente criado <br />
          em softwares CAD, como Tinkercad, Fusion 360, Blender, ou baixado de plataformas <br /> 
          como o Thingiverse, nossa impressoras são 400 mm x 400 mm x 450 mm.</p>
      </div>
    )
}

export default Acessorios