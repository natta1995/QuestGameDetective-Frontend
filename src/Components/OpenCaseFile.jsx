import { useEffect, useState } from "react";

import victimImg from "../CaseImgTest/The Library Murder on Kensington Row/Victim.png";
import crimeScenImg from "../CaseImgTest/The Library Murder on Kensington Row/Crimescen.png";
import susNef from "../CaseImgTest/The Library Murder on Kensington Row/suspektMbror.png";
import susBut from "../CaseImgTest/The Library Murder on Kensington Row/suspekt-butler.png";
import susNeg from "../CaseImgTest/The Library Murder on Kensington Row/suspekt-grannen.png";
import susHou from "../CaseImgTest/The Library Murder on Kensington Row/suspekt-housekeeper.png";

function OpenCaseFile({ questId , onClose}) {
  const [caseFile, setCaseFile] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchCaseFile() {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://localhost:7060/api/quests/${questId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setCaseFile(data);
    }

    if (questId) fetchCaseFile();
  }, [questId]);

  if (!caseFile) return <p>Opening case file...</p>;

  const suspectImages = [susBut, susNef, susHou, susNeg];

  const suspects = caseFile.suspects || [];

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
      left: (
        <img src={victimImg} className="case-photo" />
      ),
      right: (
        <>
          <h3>The Victim</h3>
          <p>{caseFile.victim}</p>
          <p>{caseFile.place}</p>
        </>
      ),
    },
    {
      left: (
        <img src={crimeScenImg} className="case-photo" />
      ),
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
              <img src={suspectImages[i]} className="suspect-img" />
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
              <img src={suspectImages[i + 2]} className="suspect-img" />
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
        </>
      ),
      right: (
        <>
          <button>Accuse a Suspect</button>
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

        <div className="page left-page">
          {pages[page].left}
        </div>

        <div className="page right-page">
          {pages[page].right}

          <div className="file-navigation">
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
    </div>
  );
}

export default OpenCaseFile;