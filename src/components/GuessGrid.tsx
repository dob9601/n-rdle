import React, {useContext} from "react"
import "./GuessGrid.css"
import {GuessContext} from "./WordleManager"

enum LetterState {
    Unconfirmed = "Unconfirmed",
    Almost = "Almost",
    Correct = "Correct",
    Incorrect = "Incorrect",
}

interface GuessGridProps {
    maxGuesses: number;
    correctWord: string
}

function GuessGrid(props: GuessGridProps) {
    const guesses = useContext(GuessContext)
    const rows = []
    
    let correctWordEncountered = false
    for (let i = 0; i < props.maxGuesses; i++) {
        const reveal = i !== guesses.length - 1
        const guessRow = <GuessRow key={i} correctWord={props.correctWord} word={correctWordEncountered ? undefined : guesses[i]} reveal={reveal} />
        rows.push(guessRow)

        if (guesses[i] === props.correctWord) {
            correctWordEncountered = true
        }
    }

    return (
        <div className="GuessGrid">
            {rows}
        </div>
    )
}

interface GuessRowProps {
    correctWord: string,
    word?: string
    reveal: boolean
}

function GuessRowInner(props: GuessRowProps) {
    return (
        <div className="GuessRow">
            {
                [...Array(props.correctWord.length)].map((_, i) => {
                    const letter = props.word !== undefined ? props.word[i] : undefined

                    if (letter !== undefined) {
                        let state

                        if (!props.reveal) {
                            state = LetterState.Unconfirmed
                        } else if (letter === props.correctWord[i]) {
                            state = LetterState.Correct
                        } else if (props.correctWord.includes(letter)) {
                            state = LetterState.Almost // TODO: Handle repeated letters
                        } else {
                            state = LetterState.Incorrect
                        }

                        return <GuessLetter key={i} letter={letter} state={state} />
                    } else {
                        return <GuessLetter key={i} letter={letter} state={LetterState.Unconfirmed} />
                    }
                })
            }
        </div>
    )
}

const GuessRow = React.memo(GuessRowInner)

interface GuessLetterProps {
    letter?: string
    state: LetterState
}

function GuessLetterInner(props: GuessLetterProps) {
    return (
        <div className={`GuessLetter ${props.state}`}>
            <p>{props.letter}</p>
        </div>
    )
}

const GuessLetter = React.memo(GuessLetterInner)

export default GuessGrid
