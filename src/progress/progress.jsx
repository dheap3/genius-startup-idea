import React from "react";
import "./progress.css";
import { getAllProgress } from "../api";

export function Progress() {
  const [playerArray, setPlayerArray] = React.useState([]);

  React.useEffect(() => {
    async function loadProgress() {
      try {
        const data = await getAllProgress();

        const players = data.map((p) => ({
          name: p.email,
          position: p.playerPosition ?? -1,
        }));

        setPlayerArray(players);
      } catch (err) {
        console.error(err);
      }
    }

    loadProgress();
  }, []);

  return (
    <main>
      <h1 id="title">Progress</h1>
      <div className="progress-board">
        <div id="header-row" className="row">
          <span>Player</span>
          <span>Progress Bar</span>
          <span>Percent</span>
        </div>

        {playerArray.map((player) => {
          let percent = 0;
          if (player.position > 134) {
            percent = 100;
          } else if (player.position >= 0) {
            percent = (player.position / 134) * 100;
          }

          return (
            <div className="row" key={player.name}>
              <span className="name">{player.name}</span>
              <progress value={percent} max="100"></progress>
              <span className="percent">{Math.round(percent)}%</span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
