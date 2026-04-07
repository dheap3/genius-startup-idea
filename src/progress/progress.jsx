import React from "react";
import "./progress.css";
import { getProgress } from "../api";

export function Progress() {
  const currentUser = localStorage.getItem("currentUser");
  const [playerPosition, setPlayerPosition] = React.useState(null);

  React.useEffect(() => {
    async function loadProgress() {
      try {
        const data = await getProgress();
        setPlayerPosition(data?.playerPosition ?? null);
      } catch (err) {
        console.error(err);
      }
    }

    loadProgress();
  }, []);

  let percent = 0;
  if (playerPosition > 134) {
    percent = 100;
  } else if (playerPosition >= 0) {
    percent = (playerPosition / 134) * 100;
  }

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
          <span className="name">{currentUser}</span>
          <progress value={percent} max="100"></progress>
          <span className="percent">{Math.round(percent)}%</span>
        </div>
      </div>
    </main>
  );
}
