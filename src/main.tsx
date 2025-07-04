import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import Header from './Header.tsx'
import Cadastro from './Cadastro.tsx'
import CadastroClientes from './Clientes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header/>
    <Cadastro/>
    <CadastroClientes/>
  </StrictMode>,
)
