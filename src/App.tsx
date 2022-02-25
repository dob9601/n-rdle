import React, {useState} from 'react';
import './App.css';
import useKeydown from './hooks/useKeydown';
import Keyboard from './Keyboard';
import {qwertyLayout} from './layouts';
import Wordle from './Wordle';

export const GuessContext = React.createContext<string[]>([])

function App() {
  const [guesses, setGuesses] = useState<string[]>([])

  useKeydown([...qwertyLayout.flat()], (event: KeyboardEvent) => {
    console.log(event.key)
    if (event.key === 'Enter') {
      // TODO: Special enter key handling
    } else if (event.key === 'Backspace') {
      console.log('asdas')
      let lastGuess = guesses[guesses.length - 1]
      if (lastGuess === undefined || lastGuess.length === 0) {
        return
      }

      lastGuess = lastGuess.slice(0, -1);
      guesses[guesses.length - 1] = lastGuess
      setGuesses(guesses)

    } else {
      let lastGuess = guesses[guesses.length - 1]

      if (lastGuess === undefined) {
        lastGuess = event.key
        guesses.push(lastGuess)
        setGuesses(guesses)
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
    <GuessContext.Provider value={guesses}>
      <Wordle />
      <Keyboard layout={qwertyLayout} />
    </GuessContext.Provider>
  );
}

export default App;
