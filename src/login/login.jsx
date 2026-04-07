import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [users, setUser] = React.useState(JSON.parse(localStorage.getItem("users")) || []);
  const [passwords, setPassword] = React.useState(JSON.parse(localStorage.getItem("passwords")) || []);
  const currentUser = localStorage.getItem("currentUser");
  const authenticated = !!currentUser;
  //connect to cookies eventually, also fix the logic so that the username and password match

  function createAccount(event) {
    const newUser = event.target[0].value;
    const newPassword = event.target[1].value;

    if (users.includes(newUser)) {
      alert("Username already exists! Please choose a different username.");
      return;
    }

    const newUsers = [...users, newUser];
    const newPasswords = [...passwords, newPassword];
    setUser(newUsers);
    setPassword(newPasswords);
    localStorage.setItem("users", JSON.stringify(newUsers));
    localStorage.setItem("passwords", JSON.stringify(newPasswords));
    alert("Your account has been created! Please log in.");
  }

  function logout() {
    fetch(`/api/auth/logout`, {
      method: "delete",
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem("userName");
      });
  }

  function processInfo(event) {
    event.preventDefault();
    const button = event.nativeEvent.submitter.innerText;
    if (button === "Create") {
      createAccount(event);
      return;
    }
    if (button === "Logout") {
      logout();
      return;
    }
    if (button === "Play") {
      navigate("/play");
      return;
    }
    const userInput = event.target[0].value;
    const passwordInput = event.target[1].value;
    if (!users.includes(userInput) || !passwords.includes(passwordInput)) {
      alert("Invalid username or password! Please try again.");
      return;
    }
    localStorage.setItem("currentUser", userInput);
    // alert("Login successful! Redirecting to game...");
    navigate("/play");
  }

  if (authenticated) {
    return (
      <main>
        <h1 id="title">Login to Candy Land</h1>
        <div className="welcome">Welcome, {currentUser}!</div>
        <form method="get" onSubmit={processInfo}>
          <div>
            <button type="submit">Logout</button>
            <button type="submit">Play</button>
          </div>
        </form>
      </main>
    );
  } else {
    return (
      <main>
        <h1 id="title">Login to Candy Land</h1>
        <form method="get" onSubmit={processInfo}>
          <input className="input-box" type="text" placeholder="email@email.com"></input>
          <input className="input-box" type="password" placeholder="password"></input>
          <div>
            <button type="submit">Login</button>
            <button type="submit">Create</button>
          </div>
        </form>
      </main>
    );
  }
}
