import { useState } from 'react';

export default function useVisualMode(inital) {
  const [mode, setMode] = useState(inital);

  return { mode };
}
