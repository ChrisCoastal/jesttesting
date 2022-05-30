import React, { useState } from 'react';

export interface CounterProps {
  description: string;
  defaultCount: number;
}

export function Counter({ description, defaultCount }: CounterProps) {
  const [count, setCount] = useState(defaultCount);
  const [incrementor, setIncrementor] = useState(1);

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
            setIncrementor(parseInt(event.target.value) || 0);
          }}
        />
      </label>
      <button
        onClick={() => setCount((prev) => prev - incrementor)}
        aria-label="Subtract from counter"
      >
        -
      </button>
      Current Count: {count}
      <button
        onClick={() => setCount((prev) => prev + incrementor)}
        aria-label="Add to counter"
      >
        +
      </button>
    </div>
  );
}
