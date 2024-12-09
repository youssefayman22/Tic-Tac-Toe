import { useState } from "react";
import GameBoard from "./Components/GameBoard/GameBoard";
import Header from "./Components/Header/Header";
import Player from "./Components/Player/Player";
import Log from "./Components/Log/Log";
import { WINNING_COMBINATIONS } from "./utils/winning-combinations";
import GameOver from "./Components/GameOver/GameOver";
import DerviedState from "./utils/DerviedState";
import DeriveGameBoard from "./utils/DeriveGameBoard";
import DeriveWinner from "./utils/DeriveWinner";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const defaultPlayers = {
  X: "Player 1",
  O: "Player 2",
}
function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const [players, setPlayerName] = useState(defaultPlayers);

  let winner;
  let gameBoard = [...initialBoard.map((array) => [...array])];
  const activePlayer = DerviedState(gameTurn);

  gameBoard = DeriveGameBoard(gameTurn, gameBoard);
  winner = DeriveWinner(gameBoard, players);

  const handleActivePlayer = (rowIndex, colIndex) => {
    setGameTurn((prevTurn) => {
      const currentPlayer = DerviedState(prevTurn);
      const updatedTurn = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevTurn,
      ];
      return updatedTurn;
    });
  };
  const handleRestart = () => {
    setGameTurn([]);
  };
  const handlePlayerChange = (symbol, playerName) => {
    setPlayerName((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: playerName,
    }));
  };
  return (
    <>
      <main>
        <Header />
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName={players.X}
              symbol="X"
              playerActive={activePlayer === "X"}
              setPlayer={handlePlayerChange}
            />
            <Player
              initialName={players.O}
              symbol="O"
              playerActive={activePlayer === "O"}
              setPlayer={handlePlayerChange}
            />
          </ol>
          <GameBoard setActive={handleActivePlayer} board={gameBoard} />
          {(gameTurn.length === 9 || winner) && (
            <GameOver winner={winner} restart={handleRestart} />
          )}
        </div>
        <Log turns={gameTurn} />
      </main>
    </>
  );
}

export default App;
