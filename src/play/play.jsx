import React from "react";
import "./play.css";
import { Square } from "./Board";
import { Board } from "./Board";
import { Player } from "./Board";

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
  //used when getting all the values of the boord squares coords
  //const [boardSquares, setBoardSquares] = React.useState([]);
  const [players, setPlayers] = React.useState([
    new Player("Uncle Mike", "/images/candy land piece.png"),
    new Player("Aunt Sally", "/images/candy land piece.png"),
    new Player("Cousin Bob", "/images/candy land piece.png"),
    new Player("Grandpa Joe", "/images/candy land piece.png"),
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = React.useState(0);
  //I could probably balance the deck better, but that's for later
  const board = new Board();

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
      // alert("Special card drawn! Move to the corresponding location on the board.");
      //swap the card with the last card in the array and pop it to remove it from the deck
      const newDeck = [...deck];
      newDeck.splice(index, 1);
      setDeck(newDeck);
    }
  }

  function handleCurrentCardClick() {
    //move the players token to the square that matches the color of the card
    console.log("Current card clicked!");
    movePlayerToSquare("Uncle Mike", "Red");
    nextPlayer();
  }

  function getNormalizedClick(mouseEvent, element) {
    const bounds = element.getBoundingClientRect();

    const clickX = mouseEvent.clientX - bounds.left;
    const clickY = mouseEvent.clientY - bounds.top;

    const normalizedX = clickX / bounds.width;
    const normalizedY = clickY / bounds.height;

    //used to get an array (formatted with ai) of the coordinates of the squares on the board
    // setBoardSquares([...boardSquares, { normalizedX, normalizedY }]);
    // localStorage.setItem("boardSquares", JSON.stringify([...boardSquares, { normalizedX, normalizedY }]));
    return { normalizedX, normalizedY };
  }

  //don't do anything yet, we'll just map out clicking on the card and the pieces moving for now
  function handleBoardClick(event) {
    const coords = getNormalizedClick(event, event.currentTarget);
    //move the players token to the square clicked (if correct color), alert if not
    console.log("Board clicked!");
  }

  function getNextSquare(currentSquare, cardColor, currentIndex = -1) {
    //get the next square of the specified color after the current square
    let currentSquareIndex = currentIndex;
    const squares = board.getSquares();
    if (currentSquare == null) {
      currentSquareIndex = -1; //if the player is not on the board, start at the beginning
    } else if (currentIndex < 0) {
      //if the index wasn't given, find it
      for (let i = 0; i < squares.length; i++) {
        if (squares[i].coords === currentSquare.getCoords()) {
          currentSquareIndex = i;
          break;
        }
      }
    }
    //now we know where we are, we need to find the next square of the color we want
    for (let i = currentSquareIndex + 1; i < squares.length; i++) {
      if (squares[i].color === cardColor) {
        return (squares[i], i);
      }
    }
  }

  function movePlayerToSquare(playerName, color) {
    //move the player's token to the specified square
    console.log(`Moving player ${playerName} to square: ${color}`);
    players.forEach((player) => {
      if (player.name === playerName) {
        let newSquare,
          newSquareIndex = getNextSquare(player.square, color);
        console.log(`New square for player ${playerName}:`, newSquare);
        player.updatePosition(newSquareIndex, newSquare);
        setPlayers([...players]); //rerender the players
      }
    });
  }

  function nextPlayer() {
    //advance to the next player's turn
    console.log("Next player's turn!");
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  }

  return (
    <main>
      <div className="player-info">
        <span>Player: </span>
        <span>Uncle Mike</span>
      </div>
      <div id="play-area">
        <img id="gameboard" src="images/Classic-Board-2004.png" alt="Candy Land Board" onClick={handleBoardClick} />
        {players.map((player) => {
          if (player.position < 0) player.updatePosition(1, board.getSquare(1));

          const square = board.getSquare(player.position);
          const { normalizedX, normalizedY } = square.getCoords();

          return (
            <img
              src={player.token}
              className="player-token"
              style={{
                left: `${normalizedX * 100}%`,
                top: `${normalizedY * 100}%`,
              }}
            />
          );
        })}
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
