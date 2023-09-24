import "../../styles/GameController.css";

import { Action, actionForKey } from "../utils/Input.js";

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer
}) => {
  const onKeyDown = ({ code }) => {
    // Capture player action
    const action = actionForKey(code);

    // Quit the game if player presses the "Q" key
    if (action === Action.Quit) {
      setGameOver(true);
    }
  };

  // Print an unpressed key to the console
  const onKeyUp = ({ code }) => {
    console.log(`onKeyUp: ${code}`);
  };

  // Capture player input using a text input element
  return (
    <input
      className="GameController"
      type="text"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      autoFocus
    />
  );
};

export default GameController;
