import React from "react"
import {Async} from "react-async"
import ReactModal from "react-modal"
import "./App.css"
import Keyboard from "./Keyboard"
import {qwertyLayout} from "./layouts"
import WordleManager from "./Wordle"

const WORD_LENGTH = 5
const WORDLE_COUNT = 10
const MAX_GUESSES = 10

const loadWords = async (props: any): Promise<string[]> => {
    const file = await fetch(`/words/${props.word_length}.txt`)
    const data = await file.text()

    return data.split("\n")
}

ReactModal.setAppElement("#root")

function App() {
    return (
        <div className="App">
            <Async promiseFn={loadWords} word_length={5}>
                <Async.Pending>
                    <p>Loading words!</p>
                </Async.Pending>
                <Async.Rejected>
                    <p>Failed to load words :( Please try reloading the page</p>
                </Async.Rejected>
                <Async.Fulfilled>
                    <WordleManager wordle_count={WORDLE_COUNT} word_length={WORD_LENGTH} max_guesses={MAX_GUESSES} />
                    <div className="KeyboardContainer">
                        <Keyboard layout={qwertyLayout} />
                    </div>
                </Async.Fulfilled>
            </Async>
        </div>
    )
}

export default App
