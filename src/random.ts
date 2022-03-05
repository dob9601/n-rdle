import {PRNG} from "./App"

export const getRandomInteger = (min: number, max:number): number => {
    const range = max - min
    return Math.round((PRNG() * range) + min)
}

export const getRandomItemFromArray = <T>(array: T[]): T => {
    return array[getRandomInteger(0, array.length - 1)]
}
