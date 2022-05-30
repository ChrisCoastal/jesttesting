import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // this
import { act } from 'react-dom/test-utils';
import { CounterAsync } from './CounterAsync';

// following v14 of user-event userEvent should now be instantiated this way
const user = userEvent.setup();
const testSetup = () =>
  render(<CounterAsync defaultCount={0} description="My Counter" />);

describe('Counter', () => {
  // can wrap describe with other describe blocks (this is purely for legibility)
  describe('initialized with defaultCount = 0, and descritpion = "My Counter"', () => {
    // use beforeEach to run code before every test (it)
    // beforeEach(() => {
    //   // no render in before each
    //   // render(<CounterAsync defaultCount={0} description="My Counter" />);
    // });

    it('renders title as "My Counter"', () => {
      testSetup();
      expect(screen.getByText(/My Counter/)).toBeInTheDocument();
    });

    it('renders "Current Count: 0"', () => {
      testSetup();
      expect(screen.getByText('Current Count: 0')).toBeInTheDocument();
    });

    describe('when + is clicked', () => {
      // can make the it tests async OR make all the beforeEach() calls async
      it('renders "Current Count: 1"', async () => {
        testSetup();
        await user.click(
          screen.getByRole('button', { name: 'Add to counter' })
        );
        const counter = await screen.findByText('Current Count: 1');
        expect(counter).toBeInTheDocument();
        // is equivalent to:
        await waitFor(() =>
          expect(screen.getByText('Current Count: 1')).toBeInTheDocument()
        );
      });
    });
  });
});
/*
// just start with rough description (refactor later)
it('defaultCount = 0; counter = 1', () => {
  render(<Counter defaultCount={0} description="My Counter" />);
  // queryByText() is the same but will return null (getByText throws an exception)
  expect(screen.getByText('Current Count: 0')).toBeInTheDocument(); // pass in a string literal
  // here adding expect/toBeInTheDocument is not required, but it is more readable
  expect(screen.getByText(/My Counter/)).toBeInTheDocument(); // or pass in a regex
  // screen.getByText(/My Counter/); // same as above
});

it('defaultCount = 0; when + clicked counter = 1', () => {
  render(<Counter defaultCount={0} description="My Counter" />);
  // fireEvent is used to test triggered events (methods on fireEvent) on the screen
  // getByRole tells query an element that is wanted
  fireEvent.click(screen.getByRole('button', { name: '+' }));
  expect(screen.getByText('Current Count: 1')).toBeInTheDocument;
});

it('defaultCount = 0; when - clicked counter = -1', () => {
  render(<Counter defaultCount={0} description="My Counter" />);
  fireEvent.click(screen.getByRole('button', { name: '-' }));
  expect(screen.getByText('Current Count: -1')).toBeInTheDocument;
});
*/

/*

// once tests are Green, move onto refactoring
// Refactored into a grouping with describe() to eliminate code repitition
// test should read very clearly (almost like a story)
describe('Counter', () => {
  // can wrap describe with other describe blocks (this is purely for legibility)
  describe('initialized with defaultCount = 0, and descritpion = "My Counter"', () => {
    // use beforeEach to run code before every test (it)
    beforeEach(() => {
      // no render in before each
      // render(<CounterAsync defaultCount={0} description="My Counter" />);
    });

    it('renders title as "My Counter"', () => {
      testSetup();
      expect(screen.getByText(/My Counter/)).toBeInTheDocument();
    });

    it('renders "Current Count: 0"', () => {
      testSetup();
      expect(screen.getByText('Current Count: 0')).toBeInTheDocument();
    });

    describe('when + is clicked', () => {
      beforeEach(() => {
        // moving this out of the it block makes it easy to add more tests later
        // was getting from the button text; but better to get by aria-label (reminder to make sure it is there)
        // fireEvent.click(screen.getByRole('button', { name: '+' }));
        user.click(screen.getByRole('button', { name: 'Add to counter' }));
      });

      // can make the it tests async OR make all the beforeEach() calls async
      it('renders "Current Count: 1"', async () => {
        testSetup();
        const counter = await screen.findByText('Current Count: 1');
        expect(counter).toBeInTheDocument();
        // is equivalent to:
        await waitFor(() =>
          expect(screen.getByText('Current Count: 1')).toBeInTheDocument()
        );
      });
    });

    describe('when - is clicked', () => {
      beforeEach(() => {
        // moving this out of the it block makes it easy to add more tests later
        fireEvent.click(
          screen.getByRole('button', { name: 'Subtract from counter' })
        );
      });

      it('renders "Current Count: -1"', () => {
        testSetup();
        expect(screen.getByText('Current Count: -1')).toBeInTheDocument;
      });
    });
  });
});

describe('Counter with Incrementer', () => {
  describe('initialized with defaultCount = 10, and descritpion = "My Incrementor"', () => {
    // use beforeEach to run code before every test (it)
    beforeEach(() => {
      // no render in beforeEach()
      // render(<CounterAsync defaultCount={10} description="My Incrementor" />);
    });

    it('renders title as "My Incrementor"', () => {
      testSetup();
      expect(screen.getByText(/My Incrementor/)).toBeInTheDocument();
    });

    it('renders "Current Count: 10"', () => {
      testSetup();
      expect(screen.getByText('Current Count: 10')).toBeInTheDocument();
    });

    describe('when user sets increment to 5 and then clicks "+" button', () => {
      beforeEach(async () => {
        // second arg is expected value - always need to be a string (b/c user input is always a string)
        await user.type(
          screen.getByLabelText(/Increment/, { selector: 'input' }),
          '{selectall}5'
        );
        // selectall is built in that has RTL select the entire field before the input following text
        await user.click(
          screen.getByRole('button', { name: 'Add to counter' })
        );
        await waitFor(() => screen.getByText('Current Count: 15')); //
      });

      it('has increment input value of 5 (number)', () => {
        testSetup();
        expect(screen.getByLabelText(/Increment/)).toHaveValue(5);
      });

      it('renders "Current Count: 15"', () => {
        testSetup();
        expect(screen.getByText('Current Count: 15')).toBeInTheDocument();
      });

      describe('when increment changes to empty and "+" is clicked', () => {
        beforeEach(async () => {
          await user.type(screen.getByLabelText(/Increment/), '{backspace}');
          await user.click(
            screen.getByRole('button', { name: 'Add to counter' })
          );
          await waitFor(() => screen.getByText('Current Count: 16'));
        });

        it('renders "Current Count: 16"', () => {
          testSetup();
          // await waitFor(() =>
          //   expect(screen.getByText('Current Count: 16')).toBeInTheDocument()
          // );

          expect(screen.getByText('Current Count: 16')).toBeInTheDocument();
        });
      });
    });
  });
});

*/
