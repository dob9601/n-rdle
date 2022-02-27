import React, {useState} from 'react';
import './App.css';
import useKeydown from './hooks/useKeydown';
import Keyboard from './Keyboard';
import {qwertyLayout} from './layouts';
import Wordle from './Wordle';

const LETTER_COUNT = 5
const MAX_GUESSES = 10

export const GuessContext = React.createContext<string[]>([])

function App() {
  const [guesses, setGuesses] = useState<string[]>([])

  useKeydown([...qwertyLayout.flat(), 'Enter', 'Backspace'], (event: KeyboardEvent) => {
    let lastGuess = guesses[guesses.length - 1]

    if (event.key === 'Enter') {
      if (lastGuess?.length === 5) {
        // TODO: Special enter key handling
        setGuesses([...guesses, ""])
      }
    } else if (event.key === 'Backspace') {
      if (lastGuess === undefined || lastGuess.length === 0) {
        return
      }

      lastGuess = lastGuess.slice(0, -1);
      guesses[guesses.length - 1] = lastGuess
      setGuesses(guesses)

    } else {
      if (lastGuess === undefined) {
        setGuesses([...guesses, event.key])
      } else if (lastGuess.length === 5) {
        return
      } else {
        lastGuess += event.key
        guesses[guesses.length - 1] = lastGuess
        setGuesses(guesses)
      }
    }
  })

  return (
    <div className="App">
      <div className="WordleContainer">
        <GuessContext.Provider value={guesses}>
          <Wordle max_guesses={MAX_GUESSES} letters={LETTER_COUNT} />
          <Wordle max_guesses={MAX_GUESSES} letters={LETTER_COUNT} />
          <Wordle max_guesses={MAX_GUESSES} letters={LETTER_COUNT} />
          <Wordle max_guesses={MAX_GUESSES} letters={LETTER_COUNT} />
          <Wordle max_guesses={MAX_GUESSES} letters={LETTER_COUNT} />
          <Wordle max_guesses={MAX_GUESSES} letters={LETTER_COUNT} />
          <Wordle max_guesses={MAX_GUESSES} letters={LETTER_COUNT} />
          <Wordle max_guesses={MAX_GUESSES} letters={LETTER_COUNT} />
          <Wordle max_guesses={MAX_GUESSES} letters={LETTER_COUNT} />
          <Wordle max_guesses={MAX_GUESSES} letters={LETTER_COUNT} />
          <Wordle max_guesses={MAX_GUESSES} letters={LETTER_COUNT} />
          <Wordle max_guesses={MAX_GUESSES} letters={LETTER_COUNT} />
          <Wordle max_guesses={MAX_GUESSES} letters={LETTER_COUNT} />
          <Wordle max_guesses={MAX_GUESSES} letters={LETTER_COUNT} />
          <Wordle max_guesses={MAX_GUESSES} letters={LETTER_COUNT} />
          <Wordle max_guesses={MAX_GUESSES} letters={LETTER_COUNT} />
          <Wordle max_guesses={MAX_GUESSES} letters={LETTER_COUNT} />
        </GuessContext.Provider>
      </div>
      <div className="KeyboardContainer">
        <Keyboard layout={qwertyLayout} />
      </div>
    </div>
  );
}

export default App;
