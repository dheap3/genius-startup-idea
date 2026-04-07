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
    <main className="container-fluid bg-secondary text-center">
      <h1>Progress</h1>
      <table className="table table-warning table-striped-columns">
        <thead>
          <tr>
            <th>Player</th>
            <th>Progress Bar</th>
            <th>Percent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{currentUser}</td>
            <td>
              <progress value={Math.round(percent)} max="100"></progress>
            </td>
            <td>{Math.round(percent)}%</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
