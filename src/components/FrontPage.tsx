import React from "react"
import "./FrontPage.css"

export function FrontPage() {
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
                <div className="Footer">
                    <p><i>Ordle was written by <a href="https://danielobr.ie/n" target="_blank" rel="noreferrer">someone who couldn{"'"}t figure out what to do with their weekends</a></i></p>
                </div>
            </div>
        </div>
    )
}
