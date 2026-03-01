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
  const [boardSquares, setBoardSquares] = React.useState([]);
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

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function handleCurrentCardClick() {
    //move the players token to the square that matches the color of the card
    let currentPlayer = players[currentPlayerIndex];
    let cardColor = card.split("/").pop().split(" ")[0];
    //get the color and number of spaces from the card filename (num spaces done below just in case it's a special card)
    console.log(cardColor);
    if (cardColor == "Gingerbread.png") {
      movePlayerToSquare(currentPlayer.name, cardColor);
    } else if (cardColor == "CandyCane.png") {
      movePlayerToSquare(currentPlayer.name, cardColor);
    } else if (cardColor == "Gumdrop.png") {
      movePlayerToSquare(currentPlayer.name, cardColor);
    } else if (cardColor == "Peanut.png") {
      movePlayerToSquare(currentPlayer.name, cardColor);
    } else if (cardColor == "Lollipop.png") {
      movePlayerToSquare(currentPlayer.name, cardColor);
    } else if (cardColor == "IceCream.png") {
      movePlayerToSquare(currentPlayer.name, cardColor);
    } else if (cardColor != "Card") {
      //this is the default card before anything has been drawn
      let numSpaces = card.split("/").pop().split(" ")[1].split(".")[0];
      for (let i = 0; i < numSpaces; i++) {
        movePlayerToSquare(currentPlayer.name, cardColor);
        await delay(500);
      }
      nextPlayer();
    } else {
      alert("Please draw a card from the deck to play your turn.");
    }
  }

  function getNormalizedClick(mouseEvent, element) {
    const bounds = element.getBoundingClientRect();

    const clickX = mouseEvent.clientX - bounds.left;
    const clickY = mouseEvent.clientY - bounds.top;

    const normalizedX = clickX / bounds.width;
    const normalizedY = clickY / bounds.height;

    //used to get an array (formatted with ai) of the coordinates of the squares on the board
    setBoardSquares([...boardSquares, { normalizedX, normalizedY }]);
    localStorage.setItem("boardSquares", JSON.stringify([...boardSquares, { normalizedX, normalizedY }]));
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
    //first check for special cards
    if (cardColor == "Gingerbread.png") {
      return [board.getSquare(8), 8];
    } else if (cardColor == "CandyCane.png") {
      return [board.getSquare(19), 19];
    } else if (cardColor == "Gumdrop.png") {
      return [board.getSquare(41), 41];
    } else if (cardColor == "Peanut.png") {
      return [board.getSquare(68), 68];
    } else if (cardColor == "Lollipop.png") {
      return [board.getSquare(91), 91];
    } else if (cardColor == "IceCream.png") {
      return [board.getSquare(101), 101];
    }
    let currentSquareIndex = currentIndex;
    const squares = board.getSquares();
    // return [squares[currentSquareIndex + 1], currentSquareIndex + 1];
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
        // console.log([squares[i], i]);
        return [squares[i], i];
      }
    }
  }

  function movePlayerToSquare(playerName, color) {
    //move the player's token to the specified square
    // console.log(`Moving player ${playerName} to square: ${color}`);
    players.forEach((player) => {
      if (player.name === playerName) {
        let [newSquare, newSquareIndex] = getNextSquare(player.square, color, player.position);
        // console.log(`New square for player ${playerName}:`, newSquare);
        player.updatePosition(newSquareIndex, newSquare);
        //because we don't want to update a react state variable, we are creating a new player and replacing the old one
        let updatedPlayers = players.map((p) => {
          if (p.name === playerName) {
            return player;
          }
          return p;
        });
        localStorage.setItem("players", JSON.stringify(updatedPlayers));
        setPlayers(updatedPlayers);
        // setPlayers([...players]); //rerender the players
      }
    });
  }

  function nextPlayer() {
    //advance to the next player's turn
    // console.log("Next player's turn!");
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  }

  return (
    <main>
      <div className="player-info">
        <span>Player: </span>
        <span>Uncle Mike</span>
      </div>
      <div id="play-area">
        <div className="board">
          <img id="gameboard" src="images/Classic-Board-2004.png" alt="Candy Land Board" onClick={handleBoardClick} />
          {players.map((player) => {
            let square, normalizedX, normalizedY;

            if (player.position < 0) {
              let randomIndex = 1; //Math.floor(Math.random() * 4) + 1;
              ({ normalizedX, normalizedY } = board.getBoardCoords()[board.getBoardCoords().length - randomIndex]);
            } else {
              square = board.getSquare(player.position);
              ({ normalizedX, normalizedY } = square.getCoords());
            }

            return (
              <img
                key={player.name}
                src={player.token}
                className="player-token"
                style={{
                  left: `${normalizedX * 100}%`,
                  top: `${normalizedY * 100}%`,
                }}
              />
            );
          })}
        </div>
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
