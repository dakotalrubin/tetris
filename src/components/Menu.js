import "../styles/Menu.css";

export default function Menu({ onClick }) {
  // Return start button
  return (
    <div className="Menu">
      <button className="start-button hover:bg-gray-100" onClick={onClick}>
        Play Tetris
      </button>
    </div>
  );
}
