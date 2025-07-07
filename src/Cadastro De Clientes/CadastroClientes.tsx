import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CadastroClientes from './Clientes.tsx'
import "./CadastroClientes.css"
import Header from '../Header.tsx'
import '../Header.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header/>
     <CadastroClientes />
  </StrictMode>,
)
