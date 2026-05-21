import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import compassImg from "./Img/compass.png";
import backgroundMusic from "./Sounds/backgroundMusic.wav";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();

  const [musicOn, setMusicOn] = useState(true);
  const [solvedCases, setSolvedCases] = useState(0);
  const [failedCases, setFailedCases] = useState(0);
  const [allPlayedCases, setAllPlayedCases] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchQuests() {
      const token = localStorage.getItem("token");

      const response = await fetch("https://localhost:7060/api/quests/mine", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setMessage("You could not retrieve your investigations.");
        return;
      }

      const data = await response.json();

      const playedCases = data.filter((q) => q.result !== 0);

      const unsuccessfulCases = data.filter((q) => q.result === 2);

      const successfulCases = data.filter((q) => q.result === 1);

      setFailedCases(unsuccessfulCases.length);
      setSolvedCases(successfulCases.length);
      setAllPlayedCases(playedCases.length);
    }

    fetchQuests();
  }, []);

  const hideNavbar =
    location.pathname === "/" || location.pathname === "/register";

  if (hideNavbar) {
    return null;
  }

  const points = solvedCases * 1000 - failedCases * 100;

  return (
    <div className="compass-menu">
      <img src={compassImg} alt="menu compass" />

      <div className="menu-dropdown">
        <h2>Menu</h2>

        <h4>Points: {points}</h4>
        <h4>Solved cases: {solvedCases}</h4>
        <h4>Failed cases: {failedCases}</h4>
        <h4>All played cases: {allPlayedCases}</h4>

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
