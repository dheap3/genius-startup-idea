import React from "react";
import "./play.css";
import { Square } from "./Board";
import { Board } from "./Board";
import { Player } from "./Board";
import { getProgress, saveProgress } from "../api";
import { connectSocket } from "../socket";

export function Play() {
  const [board, setBoard] = React.useState(() => new Board(), []);
  const [card, setCard] = React.useState("images/cards/Card Placeholder.png");
  const [deck, setDeck] = React.useState([
    "images/cards/Red 1.png",
    "images/cards/Red 2.png",
    "images/cards/Purple 1.png",
    "images/cards/Purple 2.png",
    "images/cards/Yellow 1.png",
    "images/cards/Yellow 2.png",
    "images/cards/Blue 1.png",
    "images/cards/Blue 2.png",
    "images/cards/Orange 1.png",
    "images/cards/Orange 2.png",
    "images/cards/Green 1.png",
    "images/cards/Green 2.png",
    "images/cards/Gingerbread.png",
    "images/cards/CandyCane.png",
    "images/cards/Gumdrop.png",
    "images/cards/Peanut.png",
    "images/cards/Lollipop.png",
    "images/cards/IceCream.png",
  ]);

  //websocket
  const socketRef = React.useRef(null);

  //used when getting all the values of the boord squares coords
  const [boardSquares, setBoardSquares] = React.useState([]);

  //one player for each user that has an account
  const [players, setPlayers] = React.useState([]);
  // const [users, setUsers] = React.useState(JSON.parse(localStorage.getItem("users")) || []);
  const currentUser = localStorage.getItem("currentUser");
  //new Player("Uncle Mike", "/images/candy land piece.png")

  const [currentPlayerIndex, setCurrentPlayerIndex] = React.useState(0);
  //I could probably balance the deck better, but that's for later

  // const [playerPositions, setPlayerPositions] = React.useState(JSON.parse(localStorage.getItem("playerPositions")) || {});
  const [playerPositions, setPlayerPositions] = React.useState({});

  React.useEffect(() => {
    async function loadPlayer() {
      if (!currentUser) return;

      try {
        const progress = await getProgress();
        let idx = progress?.playerPosition;

        // if missing/invalid -> off board
        if (idx == null || idx < 0 || idx >= 135) idx = -1;

        const p = new Player(currentUser, "/images/candy land piece.png");
        const square = idx >= 0 ? board.getSquare(idx) : null;
        p.updatePosition(idx, square);

        setPlayers([p]);
        setPlayerPositions({ [currentUser]: idx });
      } catch (err) {
        console.error(err);
        const p = new Player(currentUser, "/images/candy land piece.png");
        await updatePosition(p, -1, null);
        setPlayers((prev) => {
          const filtered = prev.filter((x) => x.name !== p.name);
          return [...filtered, p];
        });
        setPlayerPositions({ [currentUser]: -1 });
      }
    }

    loadPlayer();
  }, [board, currentUser]); // run once on page load

  React.useEffect(() => {
    socketRef.current = connectSocket((msg) => {
      if (msg.type === "move") {
        setPlayerPositions((prev) => ({
          ...prev,
          [msg.player]: msg.position,
        }));
      }
    });

    return () => socketRef.current?.close();
  }, []);

  function handleDeckClick() {
    //draw a card from the deck and update the current card display
    console.log("Deck clicked!");
    // For demonstration, we'll just change the card to a random one from the deck
    const index = Math.floor(Math.random() * deck.length);
    const randomCard = deck[index];
    setCard(randomCard);
    //special card check
    if (
      randomCard == "images/cards/Gingerbread.png" ||
      randomCard == "images/cards/CandyCane.png" ||
      randomCard == "images/cards/Gumdrop.png" ||
      randomCard == "images/cards/Peanut.png" ||
      randomCard == "images/cards/Lollipop.png" ||
      randomCard == "images/cards/IceCream.png"
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
    if (
      cardColor == "Gingerbread.png" ||
      cardColor == "CandyCane.png" ||
      cardColor == "Gumdrop.png" ||
      cardColor == "Peanut.png" ||
      cardColor == "Lollipop.png" ||
      cardColor == "IceCream.png"
    ) {
      movePlayerToSquare(currentPlayer.name, cardColor);
      nextPlayer();
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

  //don't do anything to click on the board yet, we'll just map out clicking on the card and the pieces moving for now
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
    //we reach here if we don't have a square of that color (and it's not a special card) (you won!)
    alert(`Congratulations! You won the game!`);
    return [new Square("End", { normalizedX: 0.5632401434080371, normalizedY: 0.2619359557665548 }), 999];
  }

  async function updateProgress(player) {
    const updated = { ...playerPositions, [player.name]: player.position };
    setPlayerPositions(updated);

    try {
      await saveProgress(player.position);
    } catch (err) {
      console.error(err);
    }
  }

  async function movePlayerToSquare(playerName, color) {
    //move the player's token to the specified square
    // console.log(`Moving player ${playerName} to square: ${color}`);
    for (const player of players) {
      if (player.name === playerName) {
        let [newSquare, newSquareIndex] = getNextSquare(player.square, color, player.position);
        // console.log(`New square for player ${playerName}:`, newSquare.getColor());
        await updatePosition(player, newSquareIndex, newSquare);
        await updateProgress(player);
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
    }
  }

  function nextPlayer() {
    //advance to the next player's turn
    // console.log("Next player's turn!");
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  }

  async function updatePosition(player, index, square) {
    //a helper to make sure the player object is updated and the db is also updated
    //for one player
    //Player player, int index, Square square

    //update the player object
    player.updatePosition(index, square);
  }
  //still need to implement making sure you can only move your player?
  //still need to implement only drawing one card on your turn
  //these are for later, make the deliverables highest priority
  //also make sure the player turn doesn't reset every time you leave and come back
  //new idea for api, generate a random image for each player when they create an account

  //TODO
  //IMPLEMENT WEBSOCKET (where updates are given to users of other users doing things in real time)

  return (
    <main>
      <div className="player-info">
        <span>Player: </span>
        <span>{currentUser?.email}</span>
      </div>
      <div id="play-area">
        <div className="board">
          <img id="gameboard" src="images/Classic-Board-2004.png" alt="Candy Land Board" onClick={handleBoardClick} />
          {players.map((player) => {
            let square, normalizedX, normalizedY;

            if (player.position < 0) {
              let randomIndex = 1; //Math.floor(Math.random() * 4) + 1;
              ({ normalizedX, normalizedY } = board.getBoardCoords()[board.getBoardCoords().length - randomIndex]);
            } else if (player.position >= 134) {
              ({ normalizedX, normalizedY } = { normalizedX: 0.5632401434080371, normalizedY: 0.2619359557665548 });
            } else {
              square = board.getSquare(player.position);
              ({ normalizedX, normalizedY } = square.getCoords());
            }
            //eventually, add a unique playername on each image or have them create their own token so that it's distinguishable
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
