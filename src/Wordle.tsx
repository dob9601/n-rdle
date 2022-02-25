import GuessGrid from './GuessGrid';
import './Wordle.css'

function Wordle() {
  return (
    <>
      <GuessGrid rows={5} columns={5} />
    </>
  )
}

export default Wordle;
