import { Link } from "react-router-dom";
import bgImg from "../../Img/HallImg.png";
import { useState } from "react";
import Letter from "../../Components/Letter/Letter";
import "./HallPage.css";

function HallPage() {
  // const isAdmin = false; // senare kan vi läsa roll från token
  const [view, setView] = useState("menu");

  return (
    <div className="hall-page" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="overlay" />

      <div className={view === "letter" ? "letter-wrapper" : "hall-card"}>
        <h2>Hallen</h2>
        <p className="subtitle">Konsulterande Detektiv</p>
        {view === "menu" && (
          <>
            {/* <p className="room-text">
              The agency is quiet. A faint light spills from the study ahead.
            </p> */}

            <Link to="/study" className="secondary">
              Gå in i arbetsrummet
            </Link>

            <button className="secondary" onClick={() => setView("letter")}>
              Öppna brevet från Scotland yard
            </button>
          </>
        )}
        {view === "letter" && (
          <>
            <Letter onClose={() => setView("menu")} />
          </>
        )}

        {/* {isAdmin && (
          <>
            <Link to="/admin" className="secondary">
              Administrative Desk
            </Link>

            <Link to="/cases/create" className="secondary">
              Register New Case
            </Link>
          </>
        )} */}
      </div>
    </div>
  );
}

export default HallPage;
