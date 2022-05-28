import React from 'react';
import { Hello } from './Hello';

import { render, screen } from '@testing-library/react';

it('renders string "Hello!"', () => {
  render(<Hello />);
  const myElement = screen.getByText('Hello!');
  expect(myElement).toBeInTheDocument(); // requires setup-jest.ts   import '@testing-library/jest-dom';
});
