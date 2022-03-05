import React from "react"
import "./Navbar.css"


interface NavbarProps {
    wordleCount: number,
    wordLength: number
}

export function Navbar(props: NavbarProps) {
    return (
        <div className="Navbar">
            <h1>{window.location.hostname}</h1>
            <h2>({props.wordleCount} wordles, {props.wordLength} letters long)</h2>
        </div>
    )
}
