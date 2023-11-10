import React from "react";

import Preview from "./Preview.js";

const Previews = ({ tetrominoes }) => {
  // Add previews for all tetrominoes except the current tetromino in play
  const previewTetrominoes = tetrominoes
    .slice(1 - tetrominoes.length)
    .reverse();

  // Style the tetromino preview text
  const nextStyles = {
    top: "0%",
    marginTop: "5px",
    borderLeft: "0px",
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "rgba(0, 0, 0, 0.9)",
    left: "63.48vw"
  };

  // Return a Preview component for each tetromino
  return (
    <>
      <div className="Preview" style={nextStyles}>
        Next:
      </div>
      {previewTetrominoes.map((tetromino, index) => (
        <Preview tetromino={tetromino} index={index} key={index} />
      ))}
    </>
  );
};

// Only render when Previews changes
export default React.memo(Previews);
