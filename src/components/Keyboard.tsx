import "./Keyboard.css"
import * as CSS from "csstype"
import React from "react"

interface KeyboardProps {
    layout: string[][]
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
                            i === props.layout.length - 1 ? <KeyboardLetter key="⏎" style={{width: "60px"}} letter = "⏎" action = "Enter" keypressCallback = {keypressCallback} /> : undefined
                        }
                        {
                            row.map((char, j) => {
                                return <KeyboardLetter key={i.toString() + "-" + j.toString()} letter={char} keypressCallback={keypressCallback} />
                            })
                        }
                        {
                            i === props.layout.length - 1 ? <KeyboardLetter key="Backspace" style={{fontSize: "1.3em", width: "60px"}} letter = "⌫" action = "Backspace" keypressCallback = {keypressCallback} /> : undefined
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
}

function KeyboardLetter(props: KeyboardLetterProps) {
    const callback = () => {
        props.keypressCallback(props.action !== undefined ? props.action : props.letter)
    }
    return (
        <div className="KeyboardLetter" style={props.style} onClick={callback}>
            <p>{props.letter}</p>
        </div>
    )
}

export default Keyboard
