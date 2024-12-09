import { useState } from "react";

const Player = ({ initialName, symbol, playerActive, setPlayer }) => {
  const [isEdit, setIsEditting] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  const handleClick = () => {
    setIsEditting((editing) => !editing);
  };
  const handleChange = (event) => {
    setPlayerName(event.target.value);
    setPlayer(symbol, playerName);
  };
  return (
    <li className={playerActive ? "active" : undefined}>
      <span className="player">
        {isEdit ? (
          <input
            type="text"
            placeholder="Enter your Name"
            value={playerName}
            onChange={handleChange}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEdit ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
