import seedrandom from "seedrandom"

const PRNG_SEED = Math.round(
    (new Date(2022, 2, 27).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
)
const PRNG = seedrandom(PRNG_SEED.toString())

export const getRandomInteger = (min: number, max:number): number => {
    const range = max - min
    return Math.round((PRNG() * range) + min)
}

export const getRandomItemFromArray = <T>(array: T[]): T => {
    return array[getRandomInteger(0, array.length)]
}
