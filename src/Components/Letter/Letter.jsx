import "./Letter.css";

const Letter = ({ onClose }) => {
  return (
    <div className="letter-paper" onClick={onClose}>
      <p>
        <em>Scotland Yard, London</em>
      </p>

      <p>
        <em>24 oktober 1939</em>
      </p>

      <br />

      <p>Min käre vän,</p>

      <p>
        Det var länge sedan sist. Jag är medveten om att ni lämnat både
        poliskåren och ert liv som privatdetektiv bakom er för att dra er
        tillbaka till ett lugnt liv i er lägenhet tillsammans med er butler.
      </p>

      <p>
        Men jag känner er alltför väl för att tro att ett sinne såsom ert trivs
        i stillhet särskilt länge.
      </p>

      <p>
        Kriget har kastat London in i mörker. Scotland Yard är hårt pressat och
        flera märkliga dödsfall har nyligen hamnat på mitt skrivbord.
      </p>

      <p>
        Jag ber därför om er hjälp ännu en gång.
      </p>

      <p>
        Studera bevisen. Undersök brottsplatserna. Observera de misstänkta noga.
      </p>

      <p>
        Er butler George bör redan ha placerat de första fallakterna på ert
        skrivbord, enligt mina instruktioner.
      </p>

      <p>
        Om er slutsats visar sig felaktig återgår fallet till Scotland Yard.
      </p>

      <br />

      <p>Lycka till, gamle gosse.</p>

      <p>
        <strong>Kommissarie Edward Whitmore</strong>
        <br />
        Scotland Yard
      </p>
    </div>
  );
};

export default Letter;