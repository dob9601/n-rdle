import "./Keyboard.css"
import * as CSS from "csstype"
import React from "react"

interface KeyboardProps {
    layout: string[][]
    guessedLetters: Set<string>
}

function Keyboard(props: KeyboardProps) {
    const keypressCallback = (key: string) => {
        window.dispatchEvent(new KeyboardEvent("keydown", {key: key}))
        setTimeout(() => {
            window.dispatchEvent(new KeyboardEvent("keyup", {key: key}))
        }, 300)
    }
    return (
        <div className="Keyboard">
            {props.layout.map((row, i) => {
                return (
                    <div key={i} className="keyboardRow">
                        {
                            i === props.layout.length - 1 ? <KeyboardLetter key="⏎" style={{width: "50px"}} letter = "⏎" action = "Enter" keypressCallback={keypressCallback} used={true} /> : undefined
                        }
                        {
                            row.map((char, j) => {
                                return <KeyboardLetter key={i.toString() + "-" + j.toString()} letter={char} keypressCallback={keypressCallback} used={props.guessedLetters.has(char)}/>
                            })
                        }
                        {
                            i === props.layout.length - 1 ? <KeyboardLetter key="Backspace" style={{fontSize: "1.3em", width: "50px"}} letter = "⌫" action = "Backspace" keypressCallback={keypressCallback} used={true} /> : undefined
                        }
                    </div>
                )
            })}
        </div>
    )
}

interface KeyboardLetterProps {
    letter: string
    action?: string
    style?: CSS.Properties
    keypressCallback: (letter: string) => void
    used: boolean
}

function KeyboardLetter(props: KeyboardLetterProps) {
    const callback = () => {
        props.keypressCallback(props.action !== undefined ? props.action : props.letter)
    }
    
    return (
        <div className={`KeyboardLetter ${props.used ? "Used" : ""}`} style={props.style} onClick={callback}>
            <p>{props.letter}</p>
        </div>
    )
}

export default Keyboard
