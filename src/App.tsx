import React, {Dispatch, SetStateAction, useState} from "react"
import {Async} from "react-async"
import ReactModal from "react-modal"
import "./App.css"
import Keyboard from "./components/Keyboard"
import {qwertyLayout} from "./layouts"
import WordleManager from "./components/WordleManager"
import {parseSubdomains} from "./numericalSubdomains"

const {wordleCount, wordLength} = parseSubdomains(window.location.host, window.location.pathname)

const MAX_GUESSES = Math.round((wordleCount + 5) * (wordLength / 5))

const loadWords = async (props: any): Promise<string[]> => {
    const file = await fetch(`/words/${props.wordLength}.txt`)
    const data = await file.text()

    return data.split("\n")
}

ReactModal.setAppElement("#root")

export const DictContext = React.createContext<string[]>([])

interface GuessedLetterContextInterface {
    guessedLetters: Set<string>,
    setGuessedLetters: Dispatch<SetStateAction<Set<string>>>
}
export const GuessedLetterContext = React.createContext<GuessedLetterContextInterface>({} as GuessedLetterContextInterface)

function App() {
    if (window.location.hostname.split(".").length <= 2) {
        return (
            <div className="DescriptionContainer">
                <div className="Description">
                    <h1>Ordle</h1>
                    <p className="tagline">Ordle is wordle, but procedurally generated!</p>
                    <h2>How does it work?</h2>
                    <ul>
                        <li>Navigate to a numeric subdomain to get that number of wordles</li>
                        <li>Wordles above size 500 aren{"'"}t recommended unless you have a beefy machine</li>
                        <li>Adding /{"<"}number{">"} to the end of the url will customise the word length. For example, <a href="https://w.ordle.xyz/8">w.ordle.xyz/8</a></li>
                        <li>Certain numeral prefixes are also supported, for example <a href="https://w.ordle.xyz">w.ordle.xyz</a>, <a href="https://qu.ordle.xyz">qu.ordle.xyz</a>, <a href="https://cent.ordle.xyz">cent.ordle.xyz</a></li>
                    </ul>
                </div>
            </div>
        )
    } else {
        const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set())

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
                            <GuessedLetterContext.Provider value={{guessedLetters: guessedLetters, setGuessedLetters: setGuessedLetters}}>
                                <DictContext.Provider value={data}>
                                    <WordleManager wordleCount={wordleCount} wordLength={wordLength} maxGuesses={MAX_GUESSES} />
                                    <div className="KeyboardContainer">
                                        <GuessedLetterContext.Consumer>
                                            {({guessedLetters: letters}) => <Keyboard layout={qwertyLayout} guessedLetters={letters} />}
                                        </GuessedLetterContext.Consumer>
                                    </div>
                                </DictContext.Provider>
                            </GuessedLetterContext.Provider>
                        )
                    }}
                    </Async.Fulfilled>
                </Async>
            </div>
        )
    }
}

export default App
