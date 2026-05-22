import { useState } from "react";
import { Link } from "react-router-dom";
import CaseFiles from "../../Components/CaseFiles/CaseFiles";
import MyCases from "../../Components/MyCases/MyCases";
import OpenCaseFile from "../../Components/OpenCaseFile/OpenCaseFile";
import studyImg from "../../Img/StudyImg.png";
import "./StudyPage.css";

function StudyPage() {
  const [view, setView] = useState("menu");
  const [selectedQuestId, setSelectedQuestId] = useState(null);

  return (
    <div className="study-page" style={{ backgroundImage: `url(${studyImg})` }}>
      <div className="overlay" />

 <div
  className={
    view === "openCase"
      ? "study-card-open-case"
      : view === "caseFiles" || view === "myCases"
        ? "study-card-wide"
        : "study-card"
  }
>
        {view === "menu" && (
          <>
            <h2>Arbetsrummet</h2>
            <p className="subtitle">Konsulterande Detektiv</p>
            {/* <p className="room-text">
              The fire crackles softly. Case files rest upon your desk.
            </p> */}

            <button className="secondary" onClick={() => setView("caseFiles")}>
              Granska filerna från Scotland yard
            </button>

            <button className="secondary" onClick={() => setView("myCases")}>
              Aktiva utredningar
            </button>

            <Link to="/study/butler" className="secondary">
              Tillkalla George
            </Link>

            <Link to="/hall" className="secondary">
              Återvänd till hallen
            </Link>
          </>
        )}

        {view === "caseFiles" && <CaseFiles onClose={() => setView("menu")} />}

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
        {view === "butlerView" && (
          <ButlerView onClose={() => setView("menu")} />
        )}
      </div>
    </div>
  );
}

export default StudyPage;
