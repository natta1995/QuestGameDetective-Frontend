import { useEffect, useState } from "react";
import "./MyCases.css";

function MyCases({ onClose, onOpenCase }) {
  const [quests, setQuests] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchQuests() {
      const token = localStorage.getItem("token");

      const response = await fetch("https://localhost:7060/api/quests/mine", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setMessage("You could not retrieve your investigations.");
        return;
      }

      const data = await response.json();
      setQuests(data);
    }

    fetchQuests();
  }, []);

  return (
    <>
      <p className="room-text">
        Your active investigations are kept in a worn leather folder.
      </p>

      {message && <p>{message}</p>}

      <div className="case-list">
        {quests.map((quest) => (
          <div
            key={quest.questId}
            className="case-item"
            onClick={() => onOpenCase(quest.questId)}
          >
            <h3>{quest.title}</h3>
          </div>
        ))}
      </div>

      <button onClick={onClose}>Close Folder</button>
    </>
  );
}

export default MyCases;
