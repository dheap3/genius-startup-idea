import React from "react";
import "./play.css";

export function Play() {
  return (
    <main>
      <div className="player-info">
        <span>Player: </span>
        <span>Uncle Mike</span>
      </div>
      <div id="play-area">
        <img id="gameboard" src="images/Classic-Board-2004.png" alt="Candy Land Board" />
        <div id="card-area">
          <div className="deck">
            Card Deck
            <img className="card" src="images/cards/Card Back.png" alt="Back of Card Deck" />
          </div>
          <div className="deck">
            <img className="card" src="images/cards/Purple2.png" alt="Purple 2 Card" />
            Current Card
          </div>
        </div>
      </div>
    </main>
  );
}
