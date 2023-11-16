import "../styles/GameController.css";

import { useState, useEffect } from "react";

import ModalDialog from "./ModalDialog.js";

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
  setPlayer,
}) => {
  // Create variable to track whether ModalDialog box is displayed
  const [isOpen, setIsOpen] = useState(false);
  // Call useDropTime hook to use state variable and setter functions
  const [dropTime, pauseDropTime, resumeDropTime, updateDropTime] = useDropTime(
    {
      gameStats,
    },
  );

  // Pause the game and give the player a game over
  async function delayedGameOver() {
    // Take away player control and pause the game
    document.querySelector(".GameController").blur();
    pauseDropTime();
    await sleep(800);

    // Allow the rendering of a ModalDialog box for a game over
    setIsOpen(true);
  }

  // Check if a newly-spawned tetromino instantly collides with anything
  useEffect(() => {
    let collided = hasCollision({
      board,
      position: player.position,
      shape: player.tetromino.shape,
    });

    // Pause the game for a moment, then open a ModalDialog box for a game over
    if (collided) {
      delayedGameOver();
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
      setIsOpen,
    });
  };

  // Capture player input using a text input element
  // Return a ModalDialog component in the event of a game over
  return (
    <div>
      <input
        className="GameController"
        type="text"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        autoFocus
      />
      <ModalDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setGameOver={setGameOver}
        finalScore={gameStats.score}
      />
    </div>
  );
};

export default GameController;
