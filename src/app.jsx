import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

export default function App() {
  return (
    <div className="candy-app">
      <header>
        <h1>
          <img src="/images/Candy-Land-Logo.png" alt="Candy Land Logo" />
        </h1>
        <menu>
          <li>
            <a href="login.html">Home</a>
          </li>
          <li>
            <a href="play.html">Play</a>
          </li>
          <li>
            <a href="progress.html">Progress</a>
          </li>
          <li>
            <a href="about.html">About</a>
          </li>
        </menu>
      </header>
      <hr />

      <hr />
      <footer>
        <div>David Heap</div>
        <a href="https://github.com/dheap3/genius-startup-idea">GitHub Repository</a>
      </footer>
    </div>
  );
}
