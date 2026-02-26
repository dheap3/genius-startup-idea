import React from "react";
import "./play.css";

export function Play() {
  function handleDeckClick() {
    //draw a card from the deck and update the current card display
    console.log("Deck clicked!");
  }
  function handleCurrentCardClick() {
    //move the players token to the square that matches the color of the card
    console.log("Current card clicked!");
    moveTokenToSquare("Red Square");
    nextPlayer();
  }
  function handleBoardClick() {
    //move the players token to the square clicked (if correct color), alert if not
    console.log("Board clicked!");
    moveTokenToSquare("Red Square");
    nextPlayer();
  }
  function moveTokenToSquare(square) {
    //move the player's token to the specified square
    console.log(`Moving token to square: ${square}`);
  }
  function nextPlayer() {
    //advance to the next player's turn
    console.log("Next player's turn!");
  }

  return (
    <main>
      <div className="player-info">
        <span>Player: </span>
        <span>Uncle Mike</span>
      </div>
      <div id="play-area">
        <img id="gameboard" src="images/Classic-Board-2004.png" alt="Candy Land Board" onClick={handleBoardClick} />
        <div id="card-area">
          <div className="deck">
            Card Deck
            <img className="card" src="images/cards/Card Back.png" alt="Back of Card Deck" onClick={handleDeckClick} />
          </div>
          <div className="deck">
            <img
              className="card"
              src="images/cards/Card Placeholder.png"
              alt="Card Placeholder"
              onClick={handleCurrentCardClick}
            />
            Current Card
          </div>
        </div>
      </div>
    </main>
  );
}
