import { useState } from "react";
import bgImg from "../../Img/BgAuthImg.png";
import "./RegisterPage.css"
import { Link } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    const response = await fetch("https://localhost:7060/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(errorText);
      setMessage("Registreringen misslyckades");
      return;
    }

    setMessage("Registrering lyckades! Du kan nu logga in.");
  }

  return (
 <div
      className="register-page"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="overlay" />

      <form className="register-card" onSubmit={handleRegister}>
        <h2>Registrera</h2>

        <p className="subtitle">Konsulterande Detektiv</p>

        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Registrera konto</button>

        {message && <p>{message}</p>}

        <p>Har du redan ett konto?</p>
           <Link to="/" className="secondary">
        Logga in
           </Link>
      </form>
      
    </div>

  );
}

export default RegisterPage;