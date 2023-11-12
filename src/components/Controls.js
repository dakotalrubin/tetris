import "../styles/Controls.css";

// Display game controls on-screen
export default function Controls() {
  return (
    <div>
      <div className="Controls Controls-Text">Controls:</div>
      <ul className="Controls">
        <li>← &nbsp; &nbsp; Move Left</li>
        <li>→ &nbsp; &nbsp; Move Right</li>
        <br></br>
        <li>↑ &nbsp; &#8202; &nbsp; Rotate</li>
        <li>↓ &nbsp; &#8202; &nbsp; Slow Drop</li>
        <li>
          <span style={{ fontSize: "10px" }}>SPACE</span> Fast Drop
        </li>
        <br></br>
        <li>P &nbsp; &nbsp; &#8202; Pause</li>
        <li>Q &#8201; &nbsp; &#8202; Quit</li>
      </ul>
    </div>
  );
}
