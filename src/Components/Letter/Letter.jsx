import "./Letter.css";

const Letter = ({ onClose }) => {
  return (
    <div className="letter-paper" onClick={onClose}>
      <p>
        <em>Scotland Yard, London</em>
      </p>
      <p>
        <em>October 24, 1939</em>
      </p>

      <br />

      <p>My dear old friend,</p>

      <p>It has been far too long.</p>

      <p>
        I am fully aware that after your years within the police force — both
        here in England and abroad — followed by your remarkable career as a
        private detective, you chose to leave that life behind and settle into a
        well-earned retirement.
      </p>

      <p>
        As I understand it, you have withdrawn to your flat at 274B, overlooking
        Big Ben itself, accompanied only by your loyal butler, George.
      </p>

      <p>And yet... I also know you far too well.</p>

      <p>
        A mind such as yours was never built for idleness. Crossword puzzles and
        evening newspapers can only occupy a man for so long before the
        restlessness begins to creep in.
      </p>

      <p>Which brings me to my proposition.</p>

      <p>
        This war of Hitler’s has cast a shadow over the whole country. London
        grows darker by the week. Resources are thin, nerves are thinner, and
        even Scotland Yard struggles beneath the weight of it all.
      </p>

      <p>
        But if there is one thing mankind refuses to abandon — even in times of
        war and misery — it is the dreadful habit of murdering one another.
      </p>

      <p>And so, I ask for your assistance once more.</p>

      <p>
        Several cases have reached my desk; deaths which are either known, or
        strongly believed, to be murders. All I ask is that you examine the
        evidence and lend us that brilliant mind of yours one final time.
      </p>

      <p>
        Study the victims. Examine the crime scenes. Observe the suspects
        carefully.
      </p>

      <p>
        When you believe you know who is guilty, you may make a single
        accusation.
      </p>

      <p>
        <strong>But be warned, old friend — only one.</strong>
      </p>

      <p>
        Whether your conclusion proves correct or not, the case will thereafter
        return to Scotland Yard.
      </p>

      <p>Do try not to disappoint me now, old boy.</p>

      <p>
        I have already sent word ahead. George should have received several of
        the case files by now and placed them in your study.
      </p>

      <br />

      <p>Best regards,</p>

      <p>
        <strong>Commissioner Edward Whitmore</strong>
        <br />
        Scotland Yard
      </p>
    </div>
  );
};

export default Letter;