import { useEffect, useState } from "react";
import "./CaseFiles.css";

function CaseFiles({ onClose }) {
  const [cases, setCases] = useState([]);
  const [message, setMessage] = useState("");
  const [myCases, setMyCases] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");

      const [casesRes, myCasesRes] = await Promise.all([
        fetch("https://localhost:7060/api/cases", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        fetch("https://localhost:7060/api/quests/mine", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (!casesRes.ok || !myCasesRes.ok) {
        setMessage("Unable to load case files.");
        return;
      }

      const casesData = await casesRes.json();
      const myCasesData = await myCasesRes.json();

      setMyCases(myCasesData);

      const acceptedCaseIds = myCasesData.map((q) => q.murderCaseId);

      const availableCases = casesData.filter(
        (c) => !acceptedCaseIds.includes(c.id),
      );

      setCases(availableCases);
    }

    fetchData();
  }, []);

  async function acceptCase(caseId) {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://localhost:7060/api/quests/accept/${caseId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      setMessage("You could not take on this case.");
      return;
    }

    setCases((prev) => prev.filter((c) => c.id !== caseId));

    setMessage("Case accepted.");
  }

  console.log(cases)

  return (
    <div className="case-files-container">
      <div className="case-files-header">
        <h2>Tillgängliga utredningar:</h2>

        <button className="close-button" onClick={onClose}>
          Stäng
        </button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="case-list-allcases">
        {cases.map((c) => (
          <div
            key={c.id}
            className="case-item"
            onClick={() => acceptCase(c.id)}
          >
            <div className="case-item-content">
              <h3>{c.title}</h3>

              <p>{c.shortSummary}</p>

              <span className="accept-text">Klicka för att ta dig an utredningen</span>
            </div>
          </div>
        ))}
      </div>
                </div>
  );
}

export default CaseFiles;