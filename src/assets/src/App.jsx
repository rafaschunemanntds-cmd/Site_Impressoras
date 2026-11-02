import logo from './assets/logo.png'
import s from './App.module.css'
import { Link } from 'react-router-dom'

function App() {
  return (
    <section className={s.inicio}>
      <img className={s.logo} src={logo} alt="logo" />
      <br /><br />
      <Link to="/produtos" className={s.botao}>
        ENTRAR
      </Link>
    </section>
  )
}

export default App