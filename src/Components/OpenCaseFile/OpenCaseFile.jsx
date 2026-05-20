import { useEffect, useState } from "react";
import ScotlandyardLogo from "../../Img/ScotlandyardImg.png";
import "./OpenCaseFile.css";
import BgPaper from "../../Img/BgPaper.png";

function OpenCaseFile({ questId, onClose }) {
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [theEndText, setTheEndText] = useState("");
  const [caseFile, setCaseFile] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchCaseFile() {
      const token = localStorage.getItem("token");

      const res = await fetch(`https://localhost:7060/api/quests/${questId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCaseFile(data);
    }

    if (questId) fetchCaseFile();
  }, [questId]);

  if (!caseFile) return <p>Opening case file...</p>;

  const suspects = caseFile.suspects || [];

  const accuseSuspect = async () => {
    if (selectedSuspect === null) {
      setResultMessage("Choose a suspect first.");
      return;
    }

    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://localhost:7060/api/quests/${questId}/accuse`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          suspectIndex: selectedSuspect,
        }),
      },
    );

    const data = await res.json();

 if (!res.ok) {
  setResultMessage("Something went wrong.");
  return;
}

setTheEndText(`Solution: ${data.solutionText}`);

setResultMessage(
  data.result === 1
    ? "Enastående arbete! Du har löst fallet och fångat mördaren."
    : "Åh nej, det verkar som du har anklagat fel person."
);
  };

  const pages = [
    {
      right: (
        <>
           <div className="top-secret-stamp">
            TOP SECRET
          </div>
          <h1 className="FirstPageH1">Scotland Yard</h1>
          
          
          <img
            src={ScotlandyardLogo}
            alt="Scotland Yard Logo"
            className="logo"
          />
          
         <h2>CASE FILE</h2>
        </>
      ),
    },
    {
            left: (
        <>
          <h1>Brev till utredaren</h1>
          <p>Detta är ett av de fall som Scotland Yard har på sitt bord.</p>
          <p>Ett mord den lokola polisen inte lyckats lösa.</p>
          <p>Det är nu ditt jobb att gå igenom allt vi har i fallet.</p>
          <p>Både bilder och text KAN innehålla ledtrådar.</p>
          <p>Igenom att klicka på bilderna kan se närmera på bilderna.</p>
          <p>I slutet av foldern kan du anklaga en misstänkt. Men kom ihåg! </p>
          <p> Du kan bara anklaga en person och du har bara ett försök! </p>
          <p>Så välj noga!</p>
          <p>Lycka till!</p>
       </> 
      ),
      right: (
        <>
          
        </>
      ),
    },
    {
      left: (
        <>
        <img
          src={`/img/cases/${caseFile.victimImg}`}
          className="case-photo clickable-image"
          alt="Victim"
          onClick={() => setSelectedImg(`/img/cases/${caseFile.victimImg}`)}
        />
        <p className="cops-handmade-notes">Offret: {caseFile.victim}</p>
       </> 
      ),
      right: (
        <>
          <h4 className="cops-handmade-notes" >{caseFile.title}</h4>
          <p className="cops-handmade-notes">Brottsplatsundersökning: {caseFile.place}</p>
          <p className="cops-handmade-notes">Dödsorsak: {caseFile.weapon}</p>
        </>
      ),
    },
    {
      left: (
        <img
          src={`/img/cases/${caseFile.crimeSceneImg}`}
          className="case-photo clickable-image"
          alt="Crime Scene"
          onClick={() => setSelectedImg(`/img/cases/${caseFile.crimeSceneImg}`)}
        />
      ),
      right: (
        <>
          <h3 className="cops-handmade-notes">Brottsplats undersökning:</h3>
          <p className="cops-handmade-notes">{caseFile.crimeSceneDescription}</p>
       
        </>
      ),
    },
    {
      left: (
        <>
          <div className="suspect-card">
            <img
              src={`/img/cases/${suspects[0]?.suspectImg}`}
              className="suspect-img clickable-image"
              alt={suspects[0]?.name}
              onClick={() => setSelectedImg(`/img/cases/${suspects[0]?.suspectImg}`)}
            />

            <div>
              <h4>{suspects[0]?.name}</h4>
              <h4>{suspects[0]?.role}</h4>
              <p>{suspects[0]?.statement}</p>
            </div>
          </div>
        </>
      ),

      right: (
        <>
          <div className="suspect-card">
            <img
              src={`/img/cases/${suspects[1]?.suspectImg}`}
              className="suspect-img clickable-image"
              alt={suspects[1]?.name}
              onClick={() => setSelectedImg(`/img/cases/${suspects[1]?.suspectImg}`)}
            />

            <div>
              <h4>{suspects[1]?.name}</h4>
              <h4>{suspects[1]?.role}</h4>
              <p>{suspects[1]?.statement}</p>
            </div>
          </div>
        </>
      ),
    },

    {
      left: (
        <>
          <div className="suspect-card">
            <img
              src={`/img/cases/${suspects[2]?.suspectImg}`}
              className="suspect-img clickable-image"
              alt={suspects[2]?.name}
              onClick={() => setSelectedImg(`/img/cases/${suspects[2]?.suspectImg}`)}
            />

            <div>
              <h4>{suspects[2]?.name}</h4>
              <h4>{suspects[2]?.role}</h4>
              <p>{suspects[2]?.statement}</p>
            </div>
          </div>
        </>
      ),

      right: (
        <>
          <div className="suspect-card">
            <img
              src={`/img/cases/${suspects[3]?.suspectImg}`}
              className="suspect-img clickable-image"
              alt={suspects[3]?.name}
              onClick={() => setSelectedImg(`/img/cases/${suspects[3]?.suspectImg}`)}
            />

            <div>
              <h4>{suspects[3]?.name}</h4>
              <h4>{suspects[3]?.role}</h4>
              <p>{suspects[3]?.statement}</p>
            </div>
          </div>
        </>
      ),
    },

    {
      left: (
        <>
          <p className="cops-handmade-notes">Förhörsledarens anteckningar:</p>
          {suspects.map((s, index) => (
            <label key={index}>
              <p style={{fontWeight: "bold"}} className="cops-handmade-notes">
                {s.name} - {s.role}
              </p>
              <p className="cops-handmade-notes">
                {s.inInvestigatorsNotes}
              </p>
            </label>
          ))}
        </>
      ),
      right: (
        <>
          <img
            src={`/img/cases/${caseFile.clueImg}`}
            className="case-photo clickable-image"
            alt="Clue?"
            onClick={() => setSelectedImg(`/img/cases/${caseFile.clueImg}`)}
          />
        </>
      ),
    },
    {
    left: (
  <>
    {!theEndText ? (
      <>
        <h3>Nu är det upp till dig, vem vill du anklaga?</h3>
        <p>Kom ihåg att du bara kan anklaga en person!</p>

        {suspects.map((s, index) => (
          <label key={index} className="accuse-option">
            <input
              type="radio"
              name="suspect"
              checked={selectedSuspect === index}
              onChange={() => setSelectedSuspect(index)}
            />

            <span>
              {s.name} - {s.role}
            </span>
          </label>
        ))}

        <button
          className="accuse-button"
          onClick={accuseSuspect}
        >
          Accuse a Suspect
        </button>
      </>
    ) : (
      <>
        {resultMessage && <p>{resultMessage}</p>}

        {theEndText && <p>{theEndText}</p>}
      </>
    )}
  </>
    ),
      right: (
        <>
    
         
        </>
      ),
    },
  ];

  console.log("Case file data:", caseFile);
  console.log("Suspects data:", suspects);

  const isFirstPage = page === 0;
  const isLastPage = page === pages.length - 1;

  return (
    <div className="book-wrapper">
     <div
  className={`
    book
    ${isFirstPage || isLastPage ? "single-page-book" : ""}
    ${isLastPage ? "last-page-book" : ""}
  `}
  style={{ backgroundImage: `url(${BgPaper})` }}
>

  {!isFirstPage && (
    <div className="page left-page">
      {pages[page].left}
    </div>
  )}

  {!isLastPage && (
    <div className="page right-page">
      {pages[page].right}

      
    </div>
  )}

</div>
          <div className="outside-navigation">

  <button
    className="side-nav-button left-nav"
    onClick={() => setPage(page - 1)}
    disabled={page === 0}
  >
    ◀ Previous
  </button>

  <button
    className="side-nav-button right-nav"
    onClick={() => setPage(page + 1)}
    disabled={page === pages.length - 1}
  >
    Next ▶
  </button>

  <button
    className="close-folder-button"
    onClick={onClose}
  >
    Close
  </button>



</div>
      {selectedImg && (
        <div className="image-modal" onClick={() => setSelectedImg(null)}>
          <img src={selectedImg} className="image-modal-content" />
        </div>
      )}
    </div>
  );
}

export default OpenCaseFile;
