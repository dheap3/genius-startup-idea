import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  function createAccount() {
    alert("Your account has been created! Please log in.");
  }

  function processInfo(event) {
    event.preventDefault();
    alert("Login successful! Redirecting to game...");
  }

  return (
    <main>
      <h1 id="title">Login to Candy Land</h1>
      <form method="get" action="play.html" onSubmit={processInfo}>
        <input className="input-box" type="text" placeholder="email@email.com"></input>
        <input className="input-box" type="password" placeholder="password"></input>
        <div>
          <button type="submit" onClick={() => navigate("/play")}>
            Login
          </button>
          <button type="button" onClick={createAccount}>
            Create
          </button>
        </div>
      </form>
    </main>
  );
}
