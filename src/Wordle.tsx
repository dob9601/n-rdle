import GuessGrid from './GuessGrid';
import './Wordle.css'

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

export default Wordle;
