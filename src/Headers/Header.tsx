import { NavLink } from "react-router";
import "./Header.css";

function Header() {
  return (
    <header>
      <nav>
        <div className="header-links">
          <a href="">Central do Vendedor</a>
          <NavLink to="/CadastroVendas">Vendas</NavLink>
          <NavLink to="/CadastroVeiculos">Veículos</NavLink>
          <NavLink to="/CadastroClientes">Clientes</NavLink>
        </div>
        <ul>
          <li>
            <NavLink to="/">Homepage</NavLink>
          </li>
        </ul>
      </nav>
      <div className="header-container"></div>
    </header>
  );
}

export default Header;
