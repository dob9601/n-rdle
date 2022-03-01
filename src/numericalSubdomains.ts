interface NumericalPrefixesInterface {
    [index: string]: number
}

const DEFAULT_WORDLE_COUNT = 2
const DEFAULT_WORD_LENGTH = 5

export const NUMERICAL_PREFIXES: NumericalPrefixesInterface = {
    w: 1,
    d: 2,
    tr: 3,
    qu: 4,
    quint: 5,
    sext: 6,
    hept: 7,
    oct: 8,
    non: 9,
    dec: 10,
    sed: 16,
    cent: 100,
    mill: 1000,
}

interface ParsedSubdomain {
    wordleCount: number,
    wordLength: number
}

export function parseSubdomains(url: string): ParsedSubdomain {
    const splitUrl = url.split(".")

    if (splitUrl.length === 4) {
        let wordLength = parseInt(splitUrl[0])
        if (!(3 <= wordLength && wordLength <= 18)) {
            wordLength = DEFAULT_WORD_LENGTH
        }

        let wordleCount = parseInt(splitUrl[1])
        if (isNaN(wordleCount)) {
            if (splitUrl[1] in NUMERICAL_PREFIXES) {
                wordleCount = NUMERICAL_PREFIXES[splitUrl[1]]
            } else {
                wordleCount = DEFAULT_WORDLE_COUNT
            }
        }

        return {
            wordLength: wordLength,
            wordleCount: wordleCount
        }
    } else if (splitUrl.length === 3) {
        let wordleCount = parseInt(splitUrl[1])
        if (isNaN(wordleCount)) {
            if (splitUrl[1] in NUMERICAL_PREFIXES) {
                wordleCount = NUMERICAL_PREFIXES[splitUrl[1]]
            } else {
                wordleCount = DEFAULT_WORDLE_COUNT
            }
        }

        return {
            wordLength: DEFAULT_WORD_LENGTH,
            wordleCount: wordleCount
        }
    } else {
        return {
            wordLength: DEFAULT_WORD_LENGTH,
            wordleCount: DEFAULT_WORDLE_COUNT
        }
    }
}
