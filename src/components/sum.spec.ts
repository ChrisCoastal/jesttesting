import { sum } from './sum';

it('will sum 5 + 2 and return 7', () => {
  // const a: string = 5; // with ts-jest this will fail, b/c string cannot be asigned to number
  // expect(a).toBe(5);
  expect(sum(5, 2)).toBe(7);
});
