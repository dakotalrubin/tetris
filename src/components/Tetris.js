import "../../styles/Tetris.css";

export default function Tetris({ rows, columns, setGameOver }) {
  return (
    <div className="Tetris">
      <p>Tetris</p>
      <p>
        Rows: {rows}, Columns: {columns}
      </p>
    </div>
  );
}
