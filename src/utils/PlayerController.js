import { rotate } from "./Tetrominoes.js";
import { Action } from "./Input.js";

const attemptRotation = ({ board, player, setPlayer }) => {
  // Create a new shape from rotating the game piece
  // Transpose the rows and columns of the original game piece shape
  const shape = rotate({
    piece: player.tetromino.shape,
    direction: 1
  });
};

// Handle game updates when player performs an action
export const playerController = ({
  action,
  board,
  player,
  setPlayer,
  setGameOver
}) => {
  // Do nothing if no player action performed
  if (!action) {
    return;
  }

  // Try to rotate the game piece if the player action is rotation
  if (action === Action.Rotate) {
    attemptRotation({ board, player, setPlayer });
  }
};
