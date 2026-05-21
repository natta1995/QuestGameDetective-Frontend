import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import compassImg from "./Img/compass.png";
import backgroundMusic from "./Sounds/backgroundMusic.wav";
import { useState } from "react";

function Navbar() {
  const location = useLocation();

  const [musicOn, setMusicOn] = useState(true);

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

        {musicOn && (
          <audio
            autoPlay
            loop
            hidden
            ref={(audio) => {
              if (audio) audio.volume = 0.1;
            }}
          >
            <source src={backgroundMusic} type="audio/wav" />
          </audio>
        )}
        <button className="music-toggle" onClick={() => setMusicOn(!musicOn)}>
          {musicOn ? "🔊" : "🔇"}
        </button>

        <NavLink to="/">Log out</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
