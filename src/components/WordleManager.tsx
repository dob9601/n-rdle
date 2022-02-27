import React, {useState} from "react"
import ReactModal from "react-modal"
import useKeydown from "../hooks/useKeydown"
import {qwertyLayout} from "../layouts"
import Wordle from "./Wordle"

interface WordleManagerProps {
    wordleCount: number
    wordLength: number
    maxGuesses: number
}

export const GuessContext = React.createContext<string[]>([])

function WordleManager(props: WordleManagerProps) {
    const [guesses, setGuesses] = useState<string[]>([])
    const [completedWordles, setCompletedWordles] = useState<Set<number>>(new Set())

    const setGameCompleted = (gameIndex: number) => {
        const newState = new Set(completedWordles)
        newState.add(gameIndex)
        setCompletedWordles(newState)
    }

    useKeydown([...qwertyLayout.flat(), "Enter", "Backspace"], (event: KeyboardEvent) => {
        setGuesses(guesses)
        let lastGuess = guesses[guesses.length - 1]

        if (event.key === "Enter") {
            if (lastGuess?.length === 5) {
                setGuesses([...guesses, ""])
            }
        } else if (event.key === "Backspace") {
            if (lastGuess === undefined || lastGuess.length === 0) {
                return
            }

            lastGuess = lastGuess.slice(0, -1)
            guesses[guesses.length - 1] = lastGuess
            setGuesses(guesses)

        } else {
            if (lastGuess === undefined) {
                setGuesses([...guesses, event.key])
            } else if (lastGuess.length === 5) {
                return
            } else {
                lastGuess += event.key
                guesses[guesses.length - 1] = lastGuess
                setGuesses(guesses)
            }
        }
    })

    return (
        <>
            <ReactModal isOpen={completedWordles.size === props.wordleCount}>
                <p>You win!</p>
            </ReactModal>
            <ReactModal isOpen={guesses.length > props.maxGuesses && !(completedWordles.size === props.wordleCount)}>
                <p>You Lose :(</p>
            </ReactModal>
            <div className="WordleContainer">
                <GuessContext.Provider value={guesses}>
                    {[...Array(props.wordleCount)].map((_, i) => <Wordle key={i} maxGuesses={props.maxGuesses} setCompleted={() => setGameCompleted(i)} completed={completedWordles.has(i)} />)}
                </GuessContext.Provider>
            </div>
        </>
    )
}

export default WordleManager
