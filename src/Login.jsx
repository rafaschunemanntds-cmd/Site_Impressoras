import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import voltar from './assets/voltar.png'
import { useLoja } from './Contextos'
import s from './Login.module.css'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { entrar } = useLoja()
  const destino = location.state?.from ?? '/produtos'

  const [cadastro, setCadastro] = useState(false)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [verSenha, setVerSenha] = useState(false)
  const [erros, setErros] = useState({})

  function enviar(e) {
    e.preventDefault()
    const novos = {}
    if (cadastro && nome.trim().length < 2) novos.nome = 'Informe seu nome.'
    if (!/^\S+@\S+\.\S+$/.test(email)) novos.email = 'Informe um e-mail válido.'
    if (senha.length < 6) novos.senha = 'A senha deve ter pelo menos 6 caracteres.'
    setErros(novos)
    if (Object.keys(novos).length > 0) return

    // Sem back-end ainda: guardamos só nome e e-mail (nunca a senha).
    entrar({ nome: nome.trim() || email.split('@')[0], email })
    navigate(destino, { replace: true })
  }

  return (
    <div className={s.all}>
      <img src={voltar} className={s.voltar} alt="Voltar"
        onClick={() => navigate('/produtos')} style={{ cursor: 'pointer' }} />
      <h1 className={s.headline}>{cadastro ? 'Criar conta' : 'Login'}</h1>
      <br /><br />
      <form className={s.botoes} onSubmit={enviar} noValidate>
        {cadastro && (
          <>
            <input className={s.info} type="text" placeholder=" Nome" autoComplete="name"
              value={nome} onChange={(e) => setNome(e.target.value)} />
            {erros.nome && <span className={s.erro}>{erros.nome}</span>}
          </>
        )}
        <input className={s.info} type="email" placeholder=" E-mail" autoComplete="email"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        {erros.email && <span className={s.erro}>{erros.email}</span>}

        <input className={s.info} type={verSenha ? 'text' : 'password'} placeholder=" Senha"
          autoComplete={cadastro ? 'new-password' : 'current-password'}
          value={senha} onChange={(e) => setSenha(e.target.value)} />
        {erros.senha && <span className={s.erro}>{erros.senha}</span>}

        <label className={s.ver}>
          <input type="checkbox" checked={verSenha} onChange={(e) => setVerSenha(e.target.checked)} />{' '}
          Mostrar senha
        </label>

        <button type="submit" className={s.botao}>{cadastro ? 'Criar conta' : 'Entrar'}</button>
        <button type="button" className={s.link} onClick={() => { setCadastro(!cadastro); setErros({}) }}>
          {cadastro ? 'Já tenho conta' : 'Criar uma conta'}
        </button>
      </form>
    </div>
  )
}

export default Login