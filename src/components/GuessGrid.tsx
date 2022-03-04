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

const getAllIndexes = (word: string, letter: string): number[] => {
    const indexes = []
    for (let i=0; i<word.length; i++) {
        if (word[i] === letter) {
            indexes.push(i)
        }
    }
    return indexes
}

function GuessGrid(props: GuessGridProps) {
    const guesses = useContext(GuessContext)
    const rows = []

    let correctWordEncountered = false
    for (let i = 0; i < props.maxGuesses; i++) {
        const reveal = i < guesses.length - 1
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
                    if (props.word !== undefined) {
                        const word = props.word
                        const letter = props.word[i]

                        if (!props.reveal) {
                            return <GuessLetter key={i} letter={letter} state={LetterState.Unconfirmed} />
                        } else if (props.correctWord[i] === letter) {
                            return <GuessLetter key={i} letter={letter} state={LetterState.Correct} />
                        }

                        const correctIndexes = getAllIndexes(props.correctWord, letter)

                        if (correctIndexes.every((index) => word[index] === letter)) {
                            // If every occurrence of letter is already matched, new one is incorrect
                            return <GuessLetter key={i} letter={letter} state={LetterState.Incorrect} />
                        } else if (correctIndexes.length > 0){
                            // If there exists an occurrence of this letter that isn't matched then almost
                            return <GuessLetter key={i} letter={letter} state={LetterState.Almost} />
                        } else {
                            // If no occurrence of letter, then incorrect
                            return <GuessLetter key={i} letter={letter} state={LetterState.Incorrect} />
                        }
                    } else {
                        return <GuessLetter key={i} letter={undefined} state={LetterState.Unconfirmed} />
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
