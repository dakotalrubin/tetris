import "../../styles/GameController.css";

import { Action, actionForKey } from "../utils/Input.js";
import { playerController } from "../utils/PlayerController.js";

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer
}) => {
  // Handle when the player presses a key
  const onKeyDown = ({ code }) => {
    // Capture player action
    const action = actionForKey(code);

    handleInput({ action });
  };

  // Handle when the player releases a key
  const onKeyUp = ({ code }) => {
    // Capture player action
    const action = actionForKey(code);

    // Quit the game if the player presses the "Q" key
    if (action === Action.Quit) {
      setGameOver(true);
    }
  };

  // GameController takes an input action and updates game
  const handleInput = ({ action }) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver
    });
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
