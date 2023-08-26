import Menu from "./Menu.js";

export default function Game({ rows, columns }) {
  // Print row and column info to console
  function start_game(rows, columns) {
    console.log("Game start!");
    console.log(`Rows: ${rows}, Columns: ${columns}`);
  }

  // Return Menu component and pass start_game() method
  return (
    <div className="Game">
      <Menu onClick={() => start_game(rows, columns)} />
    </div>
  );
}
