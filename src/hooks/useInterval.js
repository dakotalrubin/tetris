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
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
};
