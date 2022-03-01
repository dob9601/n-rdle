import React from "react"
import {Async} from "react-async"
import ReactModal from "react-modal"
import "./App.css"
import Keyboard from "./components/Keyboard"
import {qwertyLayout} from "./layouts"
import WordleManager from "./components/WordleManager"
import {parseSubdomains} from "./numericalSubdomains"

const {wordleCount, wordLength} = parseSubdomains(window.location.host)

console.log(parseSubdomains("3.du.ordle.xyz"))

const MAX_GUESSES = Math.round((wordleCount + 5) * (wordLength / 5))

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
            <Async promiseFn={loadWords} wordLength={wordLength}>
                <Async.Pending>
                    <p>Loading words!</p>
                </Async.Pending>
                <Async.Rejected>
                    <p>Failed to load words :( Please try reloading the page</p>
                </Async.Rejected>
                <Async.Fulfilled>{(data: string[]) => {
                    return (
                        <DictContext.Provider value={data}>
                            <WordleManager wordleCount={wordleCount} wordLength={wordLength} maxGuesses={MAX_GUESSES} />
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
