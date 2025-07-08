import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

//Cadastros
import CadastroClientes from "./Clientes/Clientes.tsx";
import CadastroVeiculos from "./Carros/Cadastro.tsx";
import CadastroVendas from "./Vendas/Vendas.tsx";
import "./Clientes/CadastroClientes.css";
import "./Carros/Cadastro.css";
import "./Vendas/Vendas.css"


//Headers
import Header from "./Headers/Header";
import "./Headers/Header.css";

//Homepage
import Homepage from "./Homepage/Homepage.tsx";
import "./Homepage/Homepage.css";
import HeaderHome from "./Homepage/HeaderHomepage.tsx";
import "./Homepage/HeaderHomepage.css";




//Rotas
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
   {
    path: "/CadastroVendas",
    element: (
      <>
      <Header />
      <CadastroVendas />
      </>
    )
   },
  {
    path: "/",
    element: (
      <>
        <HeaderHome />
        <Homepage />
      </>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
