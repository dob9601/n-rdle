import {useContext} from 'react'
import './GuessGrid.css'
import {GuessContext} from './Wordle'

enum LetterState {
  Unconfirmed = 'Unconfirmed',
  Almost = 'Almost',
  Correct = 'Correct'
}

interface GuessGridProps {
  rows: number;
  columns: number;
}

function GuessGrid(props: GuessGridProps) {
  const guesses = useContext(GuessContext)

  return (
    <div className="GuessGrid">
      {[...Array(props.rows)].map((_, i) => {
        return <GuessRow columns={props.columns} word={guesses[i]} />
      })}
    </div>
  )
}

interface GuessRowProps {
  columns: number,
  word?: string
}

function GuessRow(props: GuessRowProps) {

  return (
    <div className="GuessRow">
      {
        [...Array(props.columns)].map((_, i) => {
          const letter = props.word !== undefined ? props.word[i] : undefined

          return <GuessLetter letter={letter} state={LetterState.Unconfirmed} />
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
