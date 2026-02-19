import React from "react";
import "./login.css";

export function Login() {
  return (
    <main>
      <h1 id="title">Login to Candy Land</h1>
      <form method="get" action="play.html">
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
