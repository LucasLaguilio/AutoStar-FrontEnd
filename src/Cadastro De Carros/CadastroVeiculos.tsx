import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../Header.css'
import Header from '../Header.tsx'
import Cadastro from './Cadastro.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header/>
    <Cadastro/>

  </StrictMode>,
)
