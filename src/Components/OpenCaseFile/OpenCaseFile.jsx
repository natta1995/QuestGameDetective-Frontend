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
      setResultMessage(data.result);
      setTheEndText(data.solutionText);
      return;
    }

    setTheEndText(`Solution: ${data.solutionText}`);

    setResultMessage(
      data.result === "Solved"
        ? "You were correct. Scotland Yard extends its gratitude for your remarkable investigative efforts. The case is now considered solved."
        : "An unfortunate accusation. Scotland Yard will assume control of the investigation from this point onward. Better fortune may await you in the next case.",
    );
  };

  const pages = [
    {
      left: <>
      
      </>,
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
        <img
          src={`/img/cases/${caseFile.victimImg}`}
          className="case-photo clickable-image"
          alt="Victim"
          onClick={() => setSelectedImg(`/img/cases/${caseFile.victimImg}`)}
        />
      ),
      right: (
        <>
          <h4>{caseFile.title}</h4>
          <p>Victim: {caseFile.victim}</p>
          <p>Short Summary: {caseFile.shortSummary}</p>
          <p>Crime Scene: {caseFile.place}</p>
          <p>Cause of Death: {caseFile.weapon}</p>
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
          <h3>Crime Scene</h3>
          <p>{caseFile.crimeSceneDescription}</p>
       
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
          <p className="cops-handmade-notes">Investigators' Notes :</p>
          {suspects.map((s, index) => (
            <label key={index}>
              <p className="cops-handmade-notes">
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
          <h3>Your Decision</h3>
          <p>Who do you accuse?</p>

          {suspects.map((s, index) => (
            <label key={index} className="accuse-option">
              <input
                type="radio"
                name="suspect"
                checked={selectedSuspect === index}
                onChange={() => setSelectedSuspect(index)}
              />
              {s.name} - {s.role}
            </label>
          ))}

          <button onClick={accuseSuspect}>Accuse a Suspect</button>
        </>
      ),
      right: (
        <>
          {resultMessage && <p>{resultMessage}</p>}
          {theEndText && <p>{theEndText}</p>}
          <button className="secondary" onClick={onClose}>
            Think Further
          </button>
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
