import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

//Cadastros
import CadastroClientes from "./Clientes/Clientes.tsx";
import CadastroVeiculos from "./Carros/Cadastro.tsx";
import CadastroVendas from "./Vendas/Vendas.tsx";

//Headers
import Header from "./Headers/Header";

//Homepage
import Homepage from "./Homepage/Homepage.tsx";

import HeaderHome from "./Homepage/HeaderHomepage.tsx";

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
    ),
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
