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

export function parseSubdomains(host: string, path: string): ParsedSubdomain {
    const splitUrl = host.split(".")

    let wordLength = DEFAULT_WORD_LENGTH
    let wordleCount = DEFAULT_WORDLE_COUNT

    if (path !== "/") {
        wordLength = parseInt(path.split("/")[1])
        if (isNaN(wordLength)) {
            wordLength = DEFAULT_WORD_LENGTH
        }
    }

    if (splitUrl.length === 3) {
        const subdomain = splitUrl[0]

        if (subdomain in NUMERICAL_PREFIXES) {
            wordleCount = NUMERICAL_PREFIXES[subdomain]
        } else {
            wordleCount = parseInt(subdomain)
        }

    }
    // FIXME: Dies at 17+ length

    if (isNaN(wordleCount)) {
        wordleCount = DEFAULT_WORDLE_COUNT
    }
    if (isNaN(wordLength) || wordLength < 3 || wordLength > 18) {
        wordLength = DEFAULT_WORD_LENGTH // TODO: Complain about bad word length
    }

    return {
        wordLength: wordLength,
        wordleCount: wordleCount
    }
}
