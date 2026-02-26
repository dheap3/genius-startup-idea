import React from "react";
import "./play.css";

export function Play() {
  const [card, setCard] = React.useState("images/cards/Card Placeholder.png");
  const [deck, setDeck] = React.useState([
    "public/images/cards/Red 1.png",
    "public/images/cards/Red 2.png",
    "public/images/cards/Purple 1.png",
    "public/images/cards/Purple 2.png",
    "public/images/cards/Yellow 1.png",
    "public/images/cards/Yellow 2.png",
    "public/images/cards/Blue 1.png",
    "public/images/cards/Blue 2.png",
    "public/images/cards/Orange 1.png",
    "public/images/cards/Orange 2.png",
    "public/images/cards/Green 1.png",
    "public/images/cards/Green 2.png",
    "public/images/cards/Gingerbread.png",
    "public/images/cards/CandyCane.png",
    "public/images/cards/Gumdrop.png",
    "public/images/cards/Peanut.png",
    "public/images/cards/Lollipop.png",
    "public/images/cards/IceCream.png",
  ]);

  function handleDeckClick() {
    //draw a card from the deck and update the current card display
    console.log("Deck clicked!");
    // For demonstration, we'll just change the card to a random one from the deck
    const index = Math.floor(Math.random() * deck.length);
    const randomCard = deck[index];
    setCard(randomCard);
    //special card check
    if (
      randomCard == "public/images/cards/Gingerbread.png" ||
      randomCard == "public/images/cards/CandyCane.png" ||
      randomCard == "public/images/cards/Gumdrop.png" ||
      randomCard == "public/images/cards/Peanut.png" ||
      randomCard == "public/images/cards/Lollipop.png" ||
      randomCard == "public/images/cards/IceCream.png"
    ) {
      alert("Special card drawn! Move to the corresponding location on the board.");
      //swap the card with the last card in the array and pop it to remove it from the deck
      const newDeck = deck;
      newDeck.splice(index, 1);
      setDeck(newDeck);
    }
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
            <img className="card" src={card} alt="Card Placeholder" onClick={handleCurrentCardClick} />
            Current Card
          </div>
        </div>
      </div>
    </main>
  );
}
