import seedrandom from "seedrandom"


const PRNG_SEED = new Date().toISOString().split("T")[0]
const PRNG = seedrandom(PRNG_SEED.toString())

export const getRandomInteger = (min: number, max:number): number => {
    const range = max - min
    return Math.round((PRNG() * range) + min)
}

export const getRandomItemFromArray = <T>(array: T[]): T => {
    return array[getRandomInteger(0, array.length)]
}
