import React from "react"
import {Async} from "react-async"
import ReactModal from "react-modal"
import "./App.css"
import Keyboard from "./components/Keyboard"
import {qwertyLayout} from "./layouts"
import WordleManager from "./components/WordleManager"
import {NUMERICAL_PREFIXES} from "./numericalSubdomains"

const subdomain: string = window.location.host.split(".")[0]

let WORDLE_COUNT = 2
if (subdomain in NUMERICAL_PREFIXES) {
    WORDLE_COUNT = NUMERICAL_PREFIXES[subdomain]
}

const WORD_LENGTH = 5
const MAX_GUESSES = Math.round((WORDLE_COUNT + 5) * (WORD_LENGTH / 5))

const loadWords = async (props: any): Promise<string[]> => {
    const file = await fetch(`/words/${props.wordLength}.txt`)
    const data = await file.text()

    return data.split("\n")
}

ReactModal.setAppElement("#root")

export const DictContext = React.createContext<string[]>([])

function App() {
    return (
        <div className="App">
            <Async promiseFn={loadWords} wordLength={WORD_LENGTH}>
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
