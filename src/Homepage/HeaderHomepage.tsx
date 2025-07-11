import { NavLink } from "react-router";
import "./Homepage.css";
import "./HeaderHomepage.css";

function HeaderHome() {
  return (
    <header>
      <div className="Logo">
        <img src="" alt="Logo" />
      </div>
      <nav>
        <div className="header-links"></div>
        <div className="header-links2">
          <ul>
            <li>
              <NavLink to="/CadastroVeiculos">Administrador</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className="header-container"></div>
    </header>
  );
}

export default HeaderHome;
