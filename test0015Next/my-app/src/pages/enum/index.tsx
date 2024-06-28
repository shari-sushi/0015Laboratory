import "@/globals.css";
import { useEffect, useState } from "react";

export default function Enum() {
    const [day, setDay] = useState<Schedule>(defaultSchedule)
    const [day2, setDay2] = useState<Schedule>(defaultSchedule)
    const d1 = Object.keys(Day) // string[]
    const d2 = Object.values(Day) // (string | Day)[]
    const d2_1 = d2[1] // string | Day
    const d3 = Object.entries(Day) // [string, string | Day][]
    const d3_1 = d3[1] //  [string, string | Day]
    const d4 = Object.keys(Day) as Array<keyof typeof Day>
    // ("Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday")[]
    const keyNums: string[] = d1.filter((k: any) => typeof Day[k] === "number")
    const keyStrs: string[] = d1.filter((k: any) => typeof Day[k] === "string")
    // const keyDays: Day[] = d1.filter((k: Day) => typeof Day[k] === "Day")

    // https://stackoverflow.com/questions/41308123/map-typescript-enum
    const stack = (Object.keys(Day) as Array<keyof typeof Day>)
    const stack0 = stack[0] // "Sunday" | "Monday" 

    // UNION型なのでtypeofで判定できると思った私が愚かだった
    // if (typeof d3_1 === "Dry") {
    // '"string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"' 型と
    //  '"Dry"' 型が重複していないため、この比較は意図したとおりに表示されない可能性があります。
    // }

    // if (typeof d3_1 === "object") {
    //     // この条件は常に 'false' です。ts(2367)
    //     () => setDay({
    //         ...day,
    //         [Day.Sunday]: { startAt: "00:00", endAt: "24:00" }
    //     })
    // }

    // useEffect(() => {
    //     const num = Number(d1[0]) //number
    //     const numToDay = Day[num] //string
    //     const daydayday = numToDay as unknown as Day //これが正解？？？？？？？？？？？？
    //     setDay2({
    //         ...day,
    //         // strng は当然だめ
    //         // [Day.Sunday]: { startAt: day[d1[0]].startAt, endAt: "24:00" }, //error

    //         // number型の変数もだめなので、enum つまり Day型を入れる必要がある
    //         // [Day.Sunday]: { startAt: day[num].startAt, endAt: "24:00" }, //error

    //         // numToDay as unknown as Day もダメ見たい
    //         // [Day.Monday]: { startAt: day[daydayday].startAt, endAt: "24:00" },//TypeError: Cannot read properties of undefined (reading 'startAt')
    //     }), []
    // })

    return (
        <div className="bg-gray-950">
            <Aaa />
            <div className="flex ">
                <div>
                    <h1>Ts の enum</h1>
                    <div>
                        <li>{`{defaultSchedule[Day.Sunday].startAt}`} : error </li>
                        <br />
                        <li>{`{defaultSchedule[Day.Sunday].startAt}`} : {defaultSchedule[Day.Sunday].startAt}</li>
                        <br />
                        <li>{`{d2[2]}`}:{d2[2]}</li>
                        <li>{`{d2[0]}`}:{d2[0]}</li>
                        <li>{`{defaultSchedule[d2[2]]startAt}`} : error</li>
                        <li>{`{defaultSchedule[d2[2]]startAt}`} : error </li>
                        <li>{`d3[0][1]`} : {d3[0][1]}</li>
                        <li>{`{defaultSchedule[d3[0][1]]startAt}`} : erro : "string | Day"はダメ</li>
                        <li>{`{day[Day.Sunday].startAt}`}:{day[Day.Sunday].startAt} // 00:00を期待してた</li>
                        <br />
                        <li>stacoverflowの回答</li>
                        <li>
                            {` 型 '"Sunday" | "Monday"' の式を使用して型 'Schedule' にインデックスを付けることはできないため、要素は暗黙的に 'any' 型になります。`}<br />
                            {`プロパティ 'Sunday' は型 'Schedule' に存在しません。 `}<br />
                            {` {\`defaultSchedule[stack0]\`} : error`}
                        </li>
                        <li>{day2[0].startAt} ~ {day2[0].endAt}</li>
                    </div>
                </div>
            </div>

            <hr /><hr />

            <div>
                <li className="text-red-800">d2, d3にDry型の値が入ってる可能性がある。</li>
                <h2 className="text-xl"> d1 = Object.keys(Day)</h2>
                <div className="ml-4 mb-4">
                    // "(parameter) k: string"
                    {d1.map((k, i) => <div key={i}>{k}</div>)}
                </div>

                <h2 className="text-xl">d2 = Object.values(Day)</h2>
                <div className="ml-4 mb-4">
                    // "(parameter) k: string | Day"
                    {d2.map((k, i) => <div key={i}>{k}</div>)}
                    <br />
                    {d2_1} //  d2[1] // "const d2_1: string | Day"
                </div>

                <h2 className="text-xl">d3 = Object.entries(Day)</h2>
                <div className="ml-4 mb-4">
                    // "(parameter) k: [string, string | Day]"
                    {d3.map((k, i) => <div key={i}>{k}</div>)}
                </div>

                <h2 className="text-xl">d4 = {'Object.keys(Day) as Array<keyof typeof Day>'}</h2>
                <div className="ml-4 mb-4">
                    // '(parameter) k: "Sunday" | "Monday"'
                    {d4.map((k, i) => <div key={i}>{k}</div>)}
                </div>

                <h2 className="text-xl">keyNum = string[] = d1.filter((k: any) =&gt; typeof Day[k] === "number")</h2>
                <div className="ml-4 mb-4">
                    // (parameter) k: string
                    {keyNums.map((k, i) => <div key={i}>{k}</div>)}
                </div>

                <h2 className="text-xl">keyStr = string[] = d1.filter((k: any) =&gt; typeof Day[k] === "string")</h2>
                <div className="ml-4 mb-4">
                    // (parameter) k: string
                    {keyStrs.map((k, i) => <div key={i}>{k}</div>)}
                </div>
            </div>

            <hr />

            <div>
                <h2 className="text-2xl ">変数定義部分</h2>
                {``}
                {`   type DndDaySchedule = {startAt: string endAt: string{`}<br />
                const defaultStartAt = "10:00"<br />
                const defaultEndAt = "19:00"<br />
                {`      }`}
                <br /><br />
                {`   enum Day {
                    Sunday,
                    Monday,
                }`}
                <br /><br />
                {`
                interface Schedule extends Record<Day, DndDaySchedule> { `}   <br />
                {`   [Day.Sunday]: DndDaySchedule
                    [Day.Monday]: DndDaySchedule
                }
                }`}<br /><br />

                // デフォ値<br />

                {` const defaultSchedule: Schedule =  {`}<br />
                {`[Day.Sunday]: {startAt: defaultStartAt, endAt: defaultEndAt },`}<br />
                {`[Day.Monday]: {startAt: defaultStartAt, endAt: defaultEndAt },`}<br />
                {`}`}<br /><br />

                // サーバーから受け取る想定 <br />

                const gotScheduleSaverData =   {`{`}<br />
                ...defaultSchedule,<br />
                {' [Day.Sunday]: {startAt: "48:00", endAt: "72:00" }'}<br />
                {'}'}<br />
                <br />

            </div>
            <a href="/">to TOP</a>
        </div >
    )
}
const isDayType = (day: any): day is Day => {
    return Object.values(Day).includes(day as Day)
}

enum Day {
    Sunday,
    Monday,
}

type DndDaySchedule = {
    startAt: string,
    endAt: string
}

interface Schedule extends Record<Day, DndDaySchedule> {
    [Day.Sunday]: DndDaySchedule
    [Day.Monday]: DndDaySchedule
}

const defaultStartAt = "10:00"
const defaultEndAt = "19:00"

const defaultSchedule: Schedule = {
    [Day.Sunday]: { startAt: defaultStartAt, endAt: defaultEndAt },
    [Day.Monday]: { startAt: defaultStartAt, endAt: defaultEndAt },
}

// // サーバーから受け取るもの。実装したら消す。
// const gotScheduleSaverData = {
//     ...defaultSchedule,
//     [Day.Sunday]: { startAt: "48:00", endAt: "72:00" }
// }

//////////////// これで行けそう //////////////////////
const isDayTypeOf = (day: any): day is Day => {
    return Object.values(Day).includes(day as Day)
}
const Aaa = () => {
    const d2 = Object.values(Day) // (string | Day)[]
    const d2_1 = d2[1] // string | Day
    // console.log("d2", d2) // 0:"Sunday", 1:"Monday", 2:0, 3:1

    const d3 = Object.entries(Day) // [string, string | Day][]
    const d3_1 = d3[1] //  [string, string | Day]
    const d3_1_1 = d3[1][1] //  string | Day
    // console.log("d3", d3) //配列の配列 0:[0: "0", 1: "Sunday"], ...
    if (isDayType(d3_1_1)) {
        console.log("d3_1_1", d3_1_1) //配列の配列 0:[0: "0", 1: "Sunday"], ...
    }
    return (
        <div>

        </div>
    )
}

// any型になってる。おわおわり。
const Aaa2 = () => {
    const d2 = Object.values(defaultSchedule) //  any[]
    const d2_1 = d2[1] // any
    console.log("d2", d2) // 0:{startAt: '10:00', endAt: '19:00'}, ...

    const d3 = Object.entries(defaultSchedule) // [string, any][]
    const d3_1 = d3[1] //   [string, any]
    const d3_1_1 = d3[1][1] //  any
    console.log("d3", d3) // 0: {0: "0", 1: [startAt: '10:00', endAt: '19:00'], ...
    return (
        <div>

        </div>
    )
}