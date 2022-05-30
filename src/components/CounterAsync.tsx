import React, { useEffect, useState } from 'react';

export interface CounterProps {
  description: string;
  defaultCount: number;
}

export function CounterAsync({ description, defaultCount }: CounterProps) {
  const [count, setCount] = useState(defaultCount);
  const [incrementor, setIncrementor] = useState(1);
  const [spinnerSim, setSpinnerSim] = useState(defaultCount >= 15);

  useEffect(() => {
    if (count >= 15) {
      setTimeout(() => setSpinnerSim(true), 300);
    }
  });

  return (
    <div>
      <h2>
        DESC: {description} - DEFC: {defaultCount}
      </h2>
      {/* <label htmlFor="increment"> */}
      <label>
        Increment
        <input
          // aria-labelledby="increment"
          type="number"
          value={incrementor}
          onChange={(event) => {
            setIncrementor(parseInt(event.target.value) || 1);
          }}
        />
      </label>
      <button
        onClick={() =>
          setTimeout(() => setCount((prev) => prev - incrementor), 200)
        }
        aria-label="Subtract from counter"
      >
        -
      </button>
      Current Count: {count}
      <button
        onClick={() =>
          setTimeout(() => setCount((prev) => prev + incrementor), 200)
        }
        aria-label="Add to counter"
      >
        +
      </button>
      {spinnerSim ? null : <p>If current 15+, I will disappear.</p>}
    </div>
  );
}
