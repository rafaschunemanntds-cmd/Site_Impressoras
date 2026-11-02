import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Produtos from './Produtos.jsx'
import Impressora from './Impressora.jsx'
import Resina from './Resina.jsx'
import Filamento from './Filamento.jsx'
import Pecas from './Pecas.jsx'
import Acessorios from './Acessorios.jsx'
import Login from './Login.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/produtos',
    element: <Produtos />,
  },
  {
    path: '/impressora',
    element: <Impressora />,
  },
  {
    path: '/resina',
    element: <Resina />,
  },
  {
    path: '/filamento',
    element: <Filamento />,
  },
  {
    path: '/pecas',
    element: <Pecas />,
  },
  {
    path: '/acessorios',
    element: <Acessorios />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)