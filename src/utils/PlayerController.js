import { hasCollision, isWithinBoard } from "./Board.js";
import { rotate } from "./Tetrominoes.js";
import { Action } from "./Input.js";

const attemptRotation = ({ board, player, setPlayer }) => {
  // Create a new shape from rotating the game piece
  // Transpose the rows and columns of the original game piece
  const shape = rotate({
    piece: player.tetromino.shape,
    direction: 1,
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
        shape,
      },
    });
  } else {
    return false;
  }
};

export const movePlayer = ({ change, position, shape, board }) => {
  // Calculate the player's desired next position
  const attemptedNextPosition = {
    row: position.row + change.row,
    column: position.column + change.column,
  };

  // Check whether the player's next attempted position involves collision
  const collided = hasCollision({
    board,
    position: attemptedNextPosition,
    shape,
  });

  // Check whether the player's next attempted position is within board boundaries
  const isInBoard = isWithinBoard({
    board,
    position: attemptedNextPosition,
    shape,
  });

  // Create variable to block movement under given circumstances
  const preventMove = !isInBoard || (isInBoard && collided);

  // Update player's position based on whether the attempted move is successful
  const nextPosition = preventMove ? position : attemptedNextPosition;

  // Check whether the active game piece is moving down the board
  const isMovingDown = change.row > 0;

  // Check whether the active game piece has come to rest
  const hasStopped = isMovingDown && (collided || !isInBoard);

  // Return player collision status and updated position
  return { collided: hasStopped, nextPosition };
};

const attemptMovement = ({ board, player, setPlayer, action, setIsOpen }) => {
  // Track the attempted change in position
  // Default assumes no change in position
  const change = { row: 0, column: 0 };

  // Track whether the player want to fast drop a tetromino
  // Default movement is slow dropping
  let isFastDropping = false;

  // Handle different player movement actions
  if (action === Action.FastDrop) {
    isFastDropping = true;
    change.row += 1;
  } else if (action === Action.SlowDrop) {
    change.row += 1;
  } else if (action === Action.Left) {
    change.column -= 1;
  } else if (action === Action.Right) {
    change.column += 1;
  }

  // Return whether collision occurred and what the next position should be
  const { collided, nextPosition } = movePlayer({
    change,
    position: player.position,
    shape: player.tetromino.shape,
    board,
  });

  // Check for collision on the top row at tetromino spawn locations for a game over
  const isGameOver =
    collided &&
    player.position.row === 0 &&
    player.position.column === (4 || 5 || 6);
  if (isGameOver) {
    setIsOpen(isGameOver);
    return;
  }

  // Update various player attributes
  setPlayer({
    ...player,
    collided,
    isFastDropping,
    position: nextPosition,
  });
};

// Handle game updates when player performs an action
export const playerController = ({
  action,
  board,
  player,
  setPlayer,
  setIsOpen,
}) => {
  // Do nothing if no player action has been performed
  if (!action) {
    return;
  }

  // Try to rotate or translate the game piece
  if (action === Action.Rotate) {
    attemptRotation({ board, player, setPlayer });
  } else {
    attemptMovement({ board, player, setPlayer, action, setIsOpen });
  }
};
