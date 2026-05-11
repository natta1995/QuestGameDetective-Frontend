import { useEffect, useState } from "react";

import victimImg from "../CaseImgTest/The Library Murder on Kensington Row/Victim.png";
import crimeScenImg from "../CaseImgTest/The Library Murder on Kensington Row/Crimescen.png";
import susNef from "../CaseImgTest/The Library Murder on Kensington Row/suspektMbror.png";
import susBut from "../CaseImgTest/The Library Murder on Kensington Row/suspekt-butler.png";
import susNeg from "../CaseImgTest/The Library Murder on Kensington Row/suspekt-grannen.png";
import susHou from "../CaseImgTest/The Library Murder on Kensington Row/suspekt-housekeeper.png";

function OpenCaseFile({ questId, onClose }) {
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null)
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

  const suspectImages = [susBut, susNef, susHou, susNeg];

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
      left: (
        <>
          <h2>{caseFile.title}</h2>
          <p>{caseFile.shortSummary}</p>
        </>
      ),
      right: (
        <>
          <p>
            A formal case file prepared for investigation. All details contained
            within must be examined carefully.
          </p>
        </>
      ),
    },
    {
      left: <img src={victimImg} className="case-photo" onClick={() => setSelectedImg(victimImg)} />,
      right: (
        <>
          <h3>The Victim</h3>
          <p>Name: {caseFile.victim}</p>
          <p>Crimescen: {caseFile.place}</p>
        </>
      ),
    },
    {
      left: <img src={crimeScenImg} className="case-photo" onClick={() => setSelectedImg(crimeScenImg)} />,
      right: (
        <>
          <h3>Crime Scene</h3>
          <p>{caseFile.crimeSceneDescription}</p>
          <p>{caseFile.weapon}</p>
        </>
      ),
    },
    {
      left: (
        <>
          {suspects.slice(0, 2).map((s, i) => (
            <div key={i} className="suspect-card">
              <img src={suspectImages[i]} className="suspect-img" onClick={() => setSelectedImg(suspectImages[i])} />
              <div>
                <h4>{s.name}</h4>
                <p>{s.statement}</p>
              </div>
            </div>
          ))}
        </>
      ),
      right: (
        <>
          {suspects.slice(2, 4).map((s, i) => (
            <div key={i} className="suspect-card">
              <img src={suspectImages[i + 2]} className="suspect-img" onClick={() => setSelectedImg(suspectImages[i + 2])} />
              <div>
                <h4>{s.name}</h4>
                <p>{s.statement}</p>
              </div>
            </div>
          ))}
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
              {s.name}
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

  return (
    <div className="book-wrapper">
      <div className="book">
        <div className="page left-page">{pages[page].left}</div>

        <div className="page right-page">
          {pages[page].right}

          <div className="file-navigation">
            <button  onClick={onClose}>
            Close folder
          </button>

            <button onClick={() => setPage(page - 1)} disabled={page === 0}>
              Previous
            </button>

            <span>
              Page {page + 1} / {pages.length}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === pages.length - 1}
            >
              Next
            </button>
          </div>
        </div>
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
