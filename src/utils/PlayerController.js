import { hasCollision, isWithinBoard } from "./Board.js";
import { rotate } from "./Tetrominoes.js";
import { Action } from "./Input.js";

const attemptRotation = ({ board, player, setPlayer }) => {
  // Create a new shape from rotating the game piece
  // Transpose the rows and columns of the original game piece
  const shape = rotate({
    piece: player.tetromino.shape,
    direction: 1
  });

  // Track the position of the game piece
  const position = player.position;

  // Check whether the rotated game piece will remain inside the board
  // Also check game piece collision to determine whether rotation is possible
  const isValidRotation =
    isWithinBoard({ board, position, shape }) &&
    !hasCollision({ board, position, shape });

  // If the rotation is valid, update the player's game piece
  if (isValidRotation) {
    setPlayer({
      ...player,
      tetromino: {
        ...player.tetromino,
        shape
      }
    });
  } else {
    return false;
  }
};

// Handle game updates when player performs an action
export const playerController = ({
  action,
  board,
  player,
  setPlayer,
  setGameOver
}) => {
  // Do nothing if no player action has been performed
  if (!action) {
    return;
  }

  // Try to rotate the game piece if the player action is rotation
  if (action === Action.Rotate) {
    attemptRotation({ board, player, setPlayer });
  }
};
