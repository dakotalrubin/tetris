import { useEffect, useRef } from "react";

// useInterval hook by Dan Abramov
export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Store the most recent callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current();

      // Maintain focus when clicking around the web page
      const gameControllerInput = document.querySelector(".GameController");
      gameControllerInput.focus();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
};
