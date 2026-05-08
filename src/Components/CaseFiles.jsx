import { useEffect, useState } from "react";

function CaseFiles({ onClose }) {
  const [cases, setCases] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchCases() {
      const token = localStorage.getItem("token");

      const response = await fetch("https://localhost:7060/api/cases", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setMessage("You are not authorized to view the case files.");
        return;
      }

      const data = await response.json();
      setCases(data);
    }

    fetchCases();
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
      }
    );

    if (!response.ok) {
      setMessage("You could not take on this case.");
      return;
    }

    setMessage("The case has been added to your investigations.");
  }

  return (
    <>
     

      {message && <p>{message}</p>}

      <div className="case-list">
        {cases.map((c) => (
          <div key={c.id} className="case-item">
            <h3>{c.title}</h3>
            <p>{c.shortSummary}</p>

            <button onClick={() => acceptCase(c.id)}>
              Take on this Case
            </button>
          </div>
        ))}
      </div>

      <button onClick={onClose}>Close Drawer</button>
    </>
  );
}

export default CaseFiles;