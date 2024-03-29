import React, {useContext, useEffect, useState} from "react"
import {DictContext} from "../App"
import {getRandomItemFromArray} from "../random"
import GuessGrid from "./GuessGrid"
import "./Wordle.css"
import {GuessContext} from "./WordleManager"

interface WordleProps {
    maxGuesses: number,
    setCompleted: () => void,
    completed: boolean
}

function Wordle(props: WordleProps) {
    const dict = useContext(DictContext)
    const [correctWord, setCorrectWord] = useState("")

    useEffect(() => setCorrectWord(getRandomItemFromArray(dict)), [])

    const guesses = useContext(GuessContext)

    useEffect(() => {
        if (guesses.slice(0, -1).includes(correctWord) && !props.completed) {
            props.setCompleted()
        }
    })

    return (
        <div className="Wordle">
            <GuessGrid maxGuesses={props.maxGuesses} correctWord={correctWord} />
        </div>
    )
}

// Only update the component if it isn't already completed and about to go into another
// completed state
export default React.memo(Wordle, (prevProps, nextProps) => {
    return prevProps.completed && nextProps.completed
})
