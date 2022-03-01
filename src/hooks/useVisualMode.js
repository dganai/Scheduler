import { useState } from 'react';

export default function useVisualMode(inital) {
  const [mode, setMode] = useState(inital);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      history.pop();
    }
    history.push(mode);
    setMode(mode);
  };

  return { mode, transition };
}
