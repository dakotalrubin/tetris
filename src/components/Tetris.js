import "../../styles/Tetris.css";

import Board from "./Board.js";

import { useBoard } from "../hooks/useBoard.js";

export default function Tetris({ rows, columns, setGameOver }) {
  // Initialize state variable and setter
  const [board, setBoard] = useBoard({ rows, columns });

  // Return Board component and pass size info (rows and columns)
  return (
    <div className="Tetris">
      <Board board={board} />
    </div>
  );
}
