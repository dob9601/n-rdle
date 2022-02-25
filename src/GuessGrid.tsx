import {useContext} from 'react'
import {GuessContext} from './App'
import './GuessGrid.css'

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
          const letter = props.word?.charAt(i)
          return <GuessLetter letter={letter} />
        })
      }
    </div>
  )
}

interface GuessLetterProps {
  letter?: string
}

function GuessLetter(props: GuessLetterProps) {
  return (
    <div className={`GuessLetter ${props.letter !== undefined ? "filled" : "" }`}>
      <p>{props.letter}</p>
    </div>
  )
}

export default GuessGrid
