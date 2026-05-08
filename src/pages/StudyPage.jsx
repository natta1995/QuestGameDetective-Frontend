import { useState } from "react";
import { Link } from "react-router-dom";
import CaseFiles from "../Components/CaseFiles";
import MyCases from "../Components/MyCases";
import OpenCaseFile from "../Components/OpenCaseFile";
import studyImg from "../Img/StudyImg.png";
import "./Page.css";

function StudyPage() {
  const [view, setView] = useState("menu");
  const [selectedQuestId, setSelectedQuestId] = useState(null);

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${studyImg})` }}
    >
      <div className="overlay" />

      <div className={view === "openCase" ? "study-card-wide" : "login-card"}>
        <h2>The Study</h2>
        <p className="subtitle">Consulting Detective</p>

        {view === "menu" && (
          <>
            <p className="room-text">
              The fire crackles softly. Case files rest upon your desk.
            </p>

            <button onClick={() => setView("caseFiles")}>
              View Case Files
            </button>

            <button onClick={() => setView("myCases")}>
              My Investigations
            </button>

            <Link to="/hall" className="secondary">
                Return to Entrance Hall
            </Link>
              </>
        )}
  
        {view === "caseFiles" && (
          <CaseFiles onClose={() => setView("menu")} />
        )}

        {view === "myCases" && (
          <MyCases
            onClose={() => setView("menu")}
            onOpenCase={(questId) => {
              setSelectedQuestId(questId);
              setView("openCase");
            }}
          />
        )}

        {view === "openCase" && (
        <OpenCaseFile
          questId={selectedQuestId}
          onClose={() => setView("myCases")}
        />
      )}
      </div>
    </div>
  );
}

export default StudyPage;