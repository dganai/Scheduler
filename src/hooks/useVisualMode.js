import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      history.pop();
    }
    history.push(mode);
    setMode(mode);
  };
  const back = () => {
    if (history.length === 1) {
      return;
    }
    history.pop();
    setMode(history[history.length - 1]);
  };
  return { mode, transition, back };
}
