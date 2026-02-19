import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
// import { Play } from "./play/play";
// import { Progress } from "./progress/progress";
// import { About } from "./about/about";

export default function App() {
  return (
    <BrowserRouter>
      <div className="candy-app">
        <header>
          <h1>
            <img src="/images/Candy-Land-Logo.png" alt="Candy Land Logo" />
          </h1>
          <menu>
            <li>
              <NavLink to="login.html">Home</NavLink>
            </li>
            <li>
              <NavLink to="play.html">Play</NavLink>
            </li>
            <li>
              <NavLink to="progress.html">Progress</NavLink>
            </li>
            <li>
              <NavLink to="about.html">About</NavLink>
            </li>
          </menu>
        </header>
        <hr />
        <Routes>
          <Route path="/" element={<Login />} exact />
          {/* <Route path="/play" element={<Play />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
        <hr />
        <footer>
          <div>David Heap</div>
          <a href="https://github.com/dheap3/genius-startup-idea">GitHub Repository</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}
