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
      <main className="container-fluid bg-secondary text-center">
        <h1>Login to Candy Land</h1>
        <p>Welcome, {currentUser}!</p>
        <form onSubmit={processInfo}>
          <button type="submit" className="btn btn-primary m-2">
            Logout
          </button>
          <button type="submit" className="btn btn-success m-2">
            Play
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="container-fluid bg-secondary text-center">
      <h1>Login to Candy Land</h1>
      <form onSubmit={processInfo}>
        <input type="text" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <div>
          <button type="submit" className="btn btn-primary m-2">
            Login
          </button>
          <button type="submit" className="btn btn-secondary m-2">
            Create
          </button>
        </div>
      </form>
    </main>
  );
}
