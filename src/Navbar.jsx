import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import compassImg from "./Img/compass.png";

function Navbar() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" || location.pathname === "/register";

  if (hideNavbar) {
    return null;
  }

  return (
    <div className="compass-menu">
      <img src={compassImg} alt="menu compass" />

      <div className="menu-dropdown">
        <h2>Menu</h2>
        
        <h4>Insamlade poäng 5732</h4>

        <NavLink to="/">Log out</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
