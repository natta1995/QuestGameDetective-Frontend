import { useEffect, useState } from "react";
import ScotlandyardLogo from "../../Img/ScotlandyardImg.png";
import "./OpenCaseFile.css";
import BgPaper from "../../Img/BgPaper.png";
import { getCasePages } from "./OpenCasePages";

function OpenCaseFile({ questId, onClose }) {
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [clueText, setClueText] = useState("");
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
setClueText(`Ledtrågarna: ${data.solutionClues}`);

setResultMessage(
  data.result === 1
    ? "Enastående arbete! Du har löst fallet och fångat mördaren."
    : "Åh nej, det verkar som du har anklagat fel person."
);
  };

  const pages = getCasePages(
  caseFile,
  suspects,
  selectedImg,
  setSelectedImg,
  selectedSuspect,
  setSelectedSuspect,
  accuseSuspect,
  theEndText,
  resultMessage,
  clueText
);
 

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
    ◀ Förgående
  </button>

  <button
    className="side-nav-button right-nav"
    onClick={() => setPage(page + 1)}
    disabled={page === pages.length - 1}
  >
    Nästa ▶
  </button>

  <button
    className="close-folder-button"
    onClick={onClose}
  >
    Stäng
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
