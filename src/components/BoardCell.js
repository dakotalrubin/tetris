import "../../styles/BoardCell.css";

// Give each cell a unique className and some visual flair
export default function BoardCell({ cell }) {
  return (
    <div className={`BoardCell ${cell.className}`}>
      <div className="Shine"></div>
    </div>
  );
}
