import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Produtos from './Produtos.jsx'
import Categoria from './Categoria.jsx'
import Carrinho from './Carrinho.jsx'
import Pagamento from './Pagamento.jsx'
import Login from './Login.jsx'
import { LojaProvider } from './Contextos.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/produtos', element: <Produtos /> },
  { path: '/impressora', element: <Categoria slug="impressora" /> },
  { path: '/resina', element: <Categoria slug="resina" /> },
  { path: '/filamento', element: <Categoria slug="filamento" /> },
  { path: '/pecas', element: <Categoria slug="pecas" /> },
  { path: '/acessorios', element: <Categoria slug="acessorios" /> },
  { path: '/carrinho', element: <Carrinho /> },
  { path: '/pagamento', element: <Pagamento /> },
  { path: '/login', element: <Login /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LojaProvider>
      <RouterProvider router={router} />
    </LojaProvider>
  </StrictMode>,
)
