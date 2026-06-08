import { Link } from "react-router-dom";
import bgImg from "../../Img/HallImg.png";
import { useState, useEffect } from "react";
import Letter from "../../Components/Letter/Letter";

import "./HallPage.css";

function HallPage() {
  const [view, setView] = useState("menu");

  useEffect(() => {
    const hasSeenLetter = localStorage.getItem("hasSeenLetter");

    if (!hasSeenLetter) {
      setView("letter");
    }
  }, []);

  function closeLetter() {
    setView("menu");

    localStorage.setItem("hasSeenLetter", "true");
  }

  return (
    <div className="hall-page" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="overlay" />

      <div className={view === "letter" ? "letter-wrapper" : "hall-card"}>
        {view === "menu" && (
          <>
            <h2>Hallen</h2>

            <p className="subtitle">Konsulterande Detektiv</p>

            <button className="secondary" onClick={() => setView("letter")}>
              Öppna brevet från Scotland Yard
            </button>

            <Link to="/study" className="move-button">
             Stig in i arbetsrummet → 
            </Link>
          </>
        )}

        {view === "letter" && (
          <>
            <Letter onClose={closeLetter} />
          </>
        )}
      </div>
    </div>
  );
}

export default HallPage;
