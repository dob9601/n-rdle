import {useContext} from 'react'
import './GuessGrid.css'
import {GuessContext} from './Wordle'

enum LetterState {
  Unconfirmed = 'Unconfirmed',
  Almost = 'Almost',
  Correct = 'Correct',
  Incorrect = 'Incorrect',
}

interface GuessGridProps {
  max_guesses: number;
  correct_word: string
}

function GuessGrid(props: GuessGridProps) {
  const guesses = useContext(GuessContext)

  return (
    <div className="GuessGrid">
      {[...Array(props.max_guesses)].map((_, i) => {
        const reveal = i !== guesses.length - 1
        return <GuessRow key={i} correct_word={props.correct_word} word={guesses[i]} reveal={reveal}/>
      })}
    </div>
  )
}

interface GuessRowProps {
  correct_word: string,
  word?: string
  reveal: boolean
}

function GuessRow(props: GuessRowProps) {

  return (
    <div className="GuessRow">
      {
        [...Array(props.correct_word.length)].map((_, i) => {
          const letter = props.word !== undefined ? props.word[i] : undefined

          if (letter !== undefined) {
            let state;

            if (!props.reveal) {
              state = LetterState.Unconfirmed
            } else if (letter === props.correct_word[i]) {
              state = LetterState.Correct
            } else if (props.correct_word.includes(letter)) {
              state = LetterState.Almost // TODO: Handle repeated letters
            } else {
              state = LetterState.Incorrect
            }

            return <GuessLetter key={i} letter={letter} state={state} />
          } else {
            return <GuessLetter key={i} letter={letter} state={LetterState.Unconfirmed} />
          }
        })
      }
    </div>
  )
}

interface GuessLetterProps {
  letter?: string
  state: LetterState
}

function GuessLetter(props: GuessLetterProps) {
  return (
    <div className={`GuessLetter ${props.state}`}>
      <p>{props.letter}</p>
    </div>
  )
}

export default GuessGrid
