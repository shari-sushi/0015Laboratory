import { faker } from '@faker-js/faker'

export type CreateKaraoke = {
    Url: string;
    Name: string;
    SingStart: string;
}

const range = (len: number) => {
    const arr: number[] = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}


const newPerson = (): CreateKaraoke => {
    return {
        Url: "a",
        Name: "a",
        SingStart: "00:00:50",
    }
}

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): CreateKaraoke[] => {
        const len = lens[depth]!
        return range(len).map((d): CreateKaraoke => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            }
        })
    }

    return makeDataLevel()
}