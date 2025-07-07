import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import CadastroClientes from './Clientes/Clientes.tsx'
import CadastroVeiculos from './Carros/Cadastro.tsx'
import Header from './Header'
import "./Clientes/CadastroClientes.css"
import "./Carros/Cadastro.css"
import './Header.css'
import './Homepage.tsx'
import Homepage from './Homepage.tsx'
import './homepage.css'
import HeaderHome from './HeaderHomepage.tsx'
import './HeaderHomepage.css'
const router = createBrowserRouter([
  {
    path: "/CadastroClientes",
    element: (
      <>
        <Header />
        <CadastroClientes />
      </>
    ),
  },
  {
    path: "/CadastroVeiculos",
    element: (
      <>
        <Header />
        <CadastroVeiculos />
      </>
    ),
  },
  {  path: "/Homepage",
    element: (
        <>
        <HeaderHome />
        <Homepage />
        </>
    )}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

