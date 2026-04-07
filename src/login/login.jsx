import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { createAccount, login, logout } from "../api";

export function Login() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");
  const authenticated = !!currentUser;

  async function processInfo(event) {
    event.preventDefault();
    const button = event.nativeEvent.submitter.innerText;
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      if (button === "Create") {
        const result = await createAccount(email, password);
        localStorage.setItem("currentUser", result.email);
        navigate("/play");
        return;
      }

      if (button === "Logout") {
        await logout();
        localStorage.removeItem("currentUser");
        navigate("/");
        return;
      }

      if (button === "Play") {
        navigate("/play");
        return;
      }

      const result = await login(email, password);
      localStorage.setItem("currentUser", result.email);
      navigate("/play");
    } catch (err) {
      alert(err.message);
    }
  }

  if (authenticated) {
    return (
      <main>
        <h1 id="title">Login to Candy Land</h1>
        <div className="welcome">Welcome, {currentUser}!</div>
        <form onSubmit={processInfo}>
          <div>
            <button type="submit">Logout</button>
            <button type="submit">Play</button>
          </div>
        </form>
      </main>
    );
  }

  return (
    <main>
      <h1 id="title">Login to Candy Land</h1>
      <form onSubmit={processInfo}>
        <input className="input-box" type="text" placeholder="email@email.com" required></input>
        <input className="input-box" type="password" placeholder="password"></input>
        <div>
          <button type="submit">Logout</button>
          <button type="submit">Play</button>
        </div>
      </form>
    </main>
  );
}
