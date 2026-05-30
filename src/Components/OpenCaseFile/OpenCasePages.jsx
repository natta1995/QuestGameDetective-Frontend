import ScotlandyardLogo from "../../Img/ScotlandyardImg.png";

export function getCasePages(
  caseFile,
  suspects,
  selectedImg,
  setSelectedImg,
  selectedSuspect,
  setSelectedSuspect,
  accuseSuspect,
  theEndText,
  resultMessage,
  clueText,
) {
  const pages = [
    {
      right: (
        <>
          <div className="top-secret-stamp">TOP SECRET</div>
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
      <div className="paper-page">
      <h1>Instruktioner</h1>

      <p>Detta är ett av Scotland Yards olösta fall.</p>

      <p>Gå igenom allt utredningsmaterial noggrant.</p>

      <p>Både bilder och texter kan innehålla viktiga ledtrådar.</p>

      <p>Klicka på bilder för att granska dem närmare.</p>

      <p>I slutet av akten får du anklaga en misstänkt.</p>

      <p>Men tänk efter noga — du har bara ett försök.</p>

      <p>Lycka till, detektiv.</p>
      </div>
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
        <div className="paper-page">
          <img
            src={`/img/cases/${caseFile.victimImg}`}
            className="case-photo clickable-image"
            alt="Victim"
            onClick={() => setSelectedImg(`/img/cases/${caseFile.victimImg}`)}
          />
          <p className="cops-handmade-notes">Offret: {caseFile.victim}</p>
          <p className="cops-handmade-notes"> Ålder: {caseFile.victimAge}</p>
          <p className="cops-handmade-notes"> Arbete: {caseFile.victimJob}</p>
          <p className="cops-handmade-notes">
            {" "}
            Biografi: {caseFile.victimLifeSituation}
          </p>
          </div>
        </>
      ),
      right: (
        <>
        <div className="paper-page">
          <h1 className="cops-handmade-notes">{caseFile.title}</h1>
          <div>
            <h4 className="cops-handmade-notes">Summering:</h4>
            <p className="cops-handmade-notes">{caseFile.shortSummary}</p>
          </div>
          <div>
            <h4 className="cops-handmade-notes">Brottsplats:</h4>
            <p className="cops-handmade-notes">{caseFile.place}</p>
          </div>
          <div>
            <h4 className="cops-handmade-notes">Dödsorsak:</h4>
            <p className="cops-handmade-notes">{caseFile.causeOfDeath}</p>
          </div>
          <div>
            <h4 className="cops-handmade-notes">Mordvapen:</h4>
            <p className="cops-handmade-notes">{caseFile.weapon}</p>
          </div>
          </div>
        </>
      ),
    },
    {
      left: (
        <>
         <div className="paper-page">
          <img
            src={`/img/cases/${caseFile.crimeSceneImg}`}
            className="case-photo-clue clickable-image"
            alt="Crime Scene"
            onClick={() =>
              setSelectedImg(`/img/cases/${caseFile.crimeSceneImg}`)
            }
          />
          <p className="cops-handmade-notes">{caseFile.crimeSceneImgText}</p>
          </div>
        </>
      ),
      right: (
        <>
        <div className="paper-page">
          <h3 className="cops-handmade-notes">Brottsplats undersökning:</h3>
          <p className="cops-handmade-notes">
            {caseFile.crimeSceneDescription}
          </p>
          </div>
        </>
      ),
    },
    {
      left: <></>,
      right: (
        <>
          <div className="paper-page">
          <img
            src={`/img/cases/${caseFile.clueImg}`}
            className="case-photo-clue clickable-image"
            alt="Victim"
            onClick={() => setSelectedImg(`/img/cases/${caseFile.clueImg}`)}
          />
          <p className="cops-handmade-notes"> {caseFile.clueImgText} </p>
          </div>
        </>
      ),
    },

    ...suspects.map((s, index) => ({
      left: (
        <>
        <div className="paper-page">
          <div className="suspect-card">
            <img
              src={`/img/cases/${s?.suspectImg}`}
              className="suspect-img clickable-image"
              alt={s?.name}
              onClick={() => setSelectedImg(`/img/cases/${s?.suspectImg}`)}
            />

            <div>
              <h3>{s?.name}</h3>
              <p>Ålder: {s?.age}</p>
              <p>Relation till offfret: {s?.role}</p>
              <p>Yrke: {s?.job}</p>
              <p>Livssituation: {s?.lifeSituation}</p>
              <h3>Förhörsledarens anteckningar:</h3>
              <p>{s?.inInvestigatorsNotes}</p>
            </div>
          </div>
          </div>
        </>
      ),

      right: (
        <>
          <div className="paper-page">
          <div className="suspect-card">
            <p className="cops-handmade-notes">{s?.statement}</p>
          </div>
          </div>
        </>
      ),
    })),

    {
      left: <></>,
      right: (
        <>
         <div className="paper-page">
          <img
            src={`/img/cases/${caseFile.secondClueImg}`}
            className="case-photo-clue clickable-image"
            alt="Clue?"
            onClick={() =>
              setSelectedImg(`/img/cases/${caseFile.secondClueImg}`)
            }
          />
          <p className="cops-handmade-notes">{caseFile.secondClueImgText}</p>
          </div>
        </>
      ),
    },
    {
      left: (
        <>
          {!theEndText ? (
            <>
              <h3>Nu är det upp till dig...</h3>
              

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

              <label className="accuse-option">
                <input
                  type="radio"
                  name="suspect"
                  checked={selectedSuspect === 4}
                  onChange={() => setSelectedSuspect(4)}
                />

                <span>Självmord</span>
              </label>

              <label className="accuse-option">
                <input
                  type="radio"
                  name="suspect"
                  checked={selectedSuspect === 5}
                  onChange={() => setSelectedSuspect(5)}
                />

                <span>Naturliga orsaker</span>
              </label>

              <button className="accuse-button" onClick={accuseSuspect}>
                Anklaga misstänkt
              </button>
            </>
          ) : (
            <>
              {resultMessage && <p>{resultMessage}</p>}

              {theEndText && <p>{theEndText}</p>}
              {clueText && <p>{clueText}</p>}
            </>
          )}
        </>
      ),
      right: <></>,
    },
  ];
  return pages;
}
