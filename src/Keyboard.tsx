import './Keyboard.css'

interface KeyboardProps {
    layout: string[][]
}

function Keyboard(props: KeyboardProps) {
    const keypressCallback = (key: string) => {
        window.dispatchEvent(new KeyboardEvent('keydown', {key: key}))
        setTimeout(() => {
            window.dispatchEvent(new KeyboardEvent('keyup', {key: key}))
        }, 300)
    }

    return (
        <div className="Keyboard">
            {props.layout.map((row) => {
                return <div className="keyboardRow">{row.map((char) => {
                    return <KeyboardLetter letter={char} keypressCallback={keypressCallback} />
                })}</div>
            })}
        </div>
    )
}

interface KeyboardLetterProps {
    letter: string
    keypressCallback: (letter: string) => void
}

function KeyboardLetter(props: KeyboardLetterProps) {
    return (
        <div className="KeyboardLetter" onClick={() => {props.keypressCallback(props.letter)}}>
            <p>{props.letter}</p>
        </div>
    )
}

export default Keyboard;
