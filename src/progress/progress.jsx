import React from "react";
import "./progress.css";

export function Progress() {
  return (
    <main>
      <h1 id="title">Progress</h1>
      <div className="progress-board">
        <div id="header-row" className="row">
          <span>Player</span>
          <span>Progress Bar</span>
          <span>Percent</span>
        </div>
        <div className="row">
          <span className="name">Alice</span>
          <progress value="70" max="100"></progress>
          <span className="percent">70%</span>
        </div>
        <div className="row">
          <span className="name">Jerry</span>
          <progress value="30" max="100"></progress>
          <span className="percent">30%</span>
        </div>
        <div className="row">
          <span className="name">Uncle Mike</span>
          <progress value="55" max="100"></progress>
          <span className="percent">55%</span>
        </div>
        <div className="row">
          <span className="name">Susan</span>
          <progress value="88" max="100"></progress>
          <span className="percent">88%</span>
        </div>
      </div>
    </main>
  );
}
