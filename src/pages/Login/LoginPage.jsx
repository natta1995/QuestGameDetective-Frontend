import { useState } from "react";
import bgImg from "../../Img/BgAuthImg.png";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const response = await fetch("https://localhost:7060/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      setMessage("Login failed");
      return;
    }

    const token = await response.text();
    localStorage.setItem("token", token);

    setMessage("You are signed in!");
    navigate("/hall");
  }

  return (
    <div className="login-page" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="overlay" />

      <form className="login-card" onSubmit={handleLogin}>
        <h2>Login</h2>
        <p className="subtitle">Consulting Detective</p>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <p>No account yet?</p>

        <Link to="/register" className="secondary">
          Register
        </Link>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
