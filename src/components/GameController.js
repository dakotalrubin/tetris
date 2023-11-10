import "../../styles/GameController.css";

import { useEffect } from "react";

import { Action, actionForKey, actionIsDrop } from "../utils/Input.js";
import { playerController } from "../utils/PlayerController.js";
import { hasCollision } from "../utils/Board.js";

import { useInterval } from "../hooks/useInterval.js";
import { useDropTime } from "../hooks/useDropTime.js";

// Delay an event by the given amount of time in ms
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer
}) => {
  // Call useDropTime hook to use state variable and setter functions
  const [dropTime, pauseDropTime, resumeDropTime, updateDropTime] = useDropTime(
    {
      gameStats
    }
  );

  // Pause the game for the given amount of time so the player gets
  // visual feedback for their game over
  async function delayedGameOver(ms) {
    await sleep(ms);
    setGameOver(true);
  }

  // Check if a newly-spawned tetromino instantly collides with anything
  useEffect(() => {
    let collided = hasCollision({
      board,
      position: player.position,
      shape: player.tetromino.shape
    });

    // Pause the game for a moment, then give the player a game over
    if (collided) {
      document.querySelector(".GameController").blur();
      delayedGameOver(800);
    }
  });

  // Change the tetromino drop time depending on the game's level in gameStats
  // Perform a "slow drop" action at every "dropTime" unit of time
  useInterval(() => {
    updateDropTime();
    handleInput({ action: Action.SlowDrop });
  }, dropTime);

  // Handle when the player presses a key
  const onKeyDown = ({ code }) => {
    // Capture player action
    const action = actionForKey(code);

    // Handle pausing and unpausing by starting or stopping the auto-drop time
    if (action === Action.Pause) {
      if (dropTime) {
        pauseDropTime();
      } else {
        resumeDropTime();
      }
    } else if (action === Action.Quit) {
      // Quit the game if the player presses the "Q" key
      setGameOver(true);
    } else {
      // Stop auto-drop timer when manually dropping a tetromino
      if (actionIsDrop(action)) {
        pauseDropTime();
      }
      handleInput({ action });
    }
  };

  // Handle when the player releases a key
  const onKeyUp = ({ code }) => {
    // Capture player action
    const action = actionForKey(code);

    // Start auto-drop timer after manually dropping a tetromino
    if (actionIsDrop(action)) {
      resumeDropTime();
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
