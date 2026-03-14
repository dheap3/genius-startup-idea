import React from "react";
import "./progress.css";

export function Progress() {
  const [playerPositions, setPlayerPositions] = React.useState(JSON.parse(localStorage.getItem("playerPositions")) || {});
  let playerArray = [];
  for (const player in playerPositions) {
    playerArray.push({ name: player, position: playerPositions[player] });
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
        {playerArray.map((player) => {
          let percent = 0;
          if (player.position > 134) {
            console.log(player.position);
            percent = 100;
          } else if (player.position < 0) {
          } else {
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
