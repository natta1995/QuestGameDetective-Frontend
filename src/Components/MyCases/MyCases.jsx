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

     
      const activeQuests = data.filter(
        (q) => q.result === 0
      );

      setQuests(activeQuests);
      
    }

    fetchQuests();
  }, []);

  async function deleteQuest(questId) {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://localhost:7060/api/quests/${questId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      setMessage("Could not remove investigation.");
      return;
    }

    setQuests((prev) => prev.filter((q) => q.questId !== questId));

    setMessage("Investigation removed.");
  }

  console.log(quests);

  return (
    <div className="my-cases-container">
      <div className="my-cases-header">
        <h2>Mina utredningar:</h2>

        <button className="close-button" onClick={onClose}>
          Stäng 
        </button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="case-list">
        {quests.map((quest) => (
          <div key={quest.questId} className="case-item">
             <button
              className="delete-button"
              onClick={() => deleteQuest(quest.questId)}
            >
              X
            </button>
            <div
              className="case-item-content"
              onClick={() => onOpenCase(quest.questId)}
            >
              <h3>{quest.title}</h3>

              <span className="accept-text">Klicka för att öppna utredningen</span>
            </div>

           
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyCases;
