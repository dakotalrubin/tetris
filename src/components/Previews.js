import React from "react";

import Preview from "./Preview.js";

const Previews = ({ tetrominoes }) => {
  // Add previews for all tetrominoes except the current tetromino in play
  const previewTetrominoes = tetrominoes
    .slice(1 - tetrominoes.length)
    .reverse();

  // Return a Preview component for each tetromino
  return (
    <>
      {previewTetrominoes.map((tetromino, index) => (
        <Preview tetromino={tetromino} index={index} key={index} />
      ))}
    </>
  );
};

// Only render when Previews changes
export default React.memo(Previews);
