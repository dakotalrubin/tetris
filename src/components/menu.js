import "../../styles/menu.css";

const Menu = ({ onClick }) => (
  <div className="menu">
    <button className="button" onClick={onClick}>
      Play Tetris
    </button>
  </div>
);

export default Menu;
