import React, {useState} from 'react';
import GuessGrid from './GuessGrid';
import useKeydown from './hooks/useKeydown';
import {qwertyLayout} from './layouts';
import './Wordle.css'

interface WordleContainerProps {
  wordle_count: number
  word_length: number
  max_guesses: number
}

export const GuessContext = React.createContext<string[]>([])

function WordleContainer(props: WordleContainerProps) {
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

    <div className="WordleContainer">
      <GuessContext.Provider value={guesses}>
        {[...Array(props.wordle_count)].map(() => <Wordle max_guesses={props.max_guesses} letters={props.word_length} />)}
      </GuessContext.Provider>
    </div>
  )
}

interface WordleProps {
  letters: number;
  max_guesses: number;
}

function Wordle(props: WordleProps) {
  return (
    <div className="Wordle">
      <GuessGrid rows={props.max_guesses} columns={props.letters} />
    </div>
  )
}

export default WordleContainer;
