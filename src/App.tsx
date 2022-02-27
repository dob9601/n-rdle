import React from "react"
import {Async} from "react-async"
import ReactModal from "react-modal"
import "./App.css"
import Keyboard from "./components/Keyboard"
import {qwertyLayout} from "./layouts"
import WordleManager from "./components/WordleManager"

const WORD_LENGTH = 5
const WORDLE_COUNT = 2
const MAX_GUESSES = 10

const loadWords = async (props: any): Promise<string[]> => {
    const file = await fetch(`/words/${props.word_length}.txt`)
    const data = await file.text()

    return data.split("\n")
}

ReactModal.setAppElement("#root")

export const DictContext = React.createContext<string[]>([])

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
                <Async.Fulfilled>{(data: string[]) => {
                    return (
                        <DictContext.Provider value={data}>
                            <WordleManager wordleCount={WORDLE_COUNT} wordLength={WORD_LENGTH} maxGuesses={MAX_GUESSES} />
                            <div className="KeyboardContainer">
                                <Keyboard layout={qwertyLayout} />
                            </div>
                        </DictContext.Provider>
                    )}}
                </Async.Fulfilled>
            </Async>
        </div>
    )
}

export default App
