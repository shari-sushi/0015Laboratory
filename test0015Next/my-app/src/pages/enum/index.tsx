import "@/globals.css";

export default function Enum() {
    const d1 = Object.keys(Day) // string[]
    const d2 = Object.values(Day) // (string | Day)[]
    const d2_1 = d2[1] // Day[]
    const d3 = Object.entries(Day) // [string, string | Day][]
    const d4 = Object.keys(Day) as Array<keyof typeof Day>
    // ("Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday")[]

    const keyNums: string[] = d1.filter((k: any) => typeof Day[k] === "number")
    const keyStrs: string[] = d1.filter((k: any) => typeof Day[k] === "string")
    return (
        <div className=" bg-gray-900">
            <div className="flex ">
                <div>
                    <h1>Ts の enum</h1>
                    <div>
                        <li>{`{defaultSchedule[Day.Sunday].startAt}`} : error </li>
                        <br />
                        <li className="text-red-800">d2, d3にDry型の値が入ってる可能性がある。</li>
                        <li>{`{defaultSchedule[Day.Sunday].startAt}`} : {defaultSchedule[Day.Sunday].startAt}</li>
                        <br />
                        <li>{`{d2[2]}`}:{d2[2]}</li>
                        <li>{`{d2[0]}`}:{d2[0]}</li>
                    </div>
                </div>
            </div>
            <hr /><hr />
            <div>
                <h2>d1 = Object.keys(Day)</h2>
                // (parameter) k: string
                {d1.map((k, i) => <div key={i}>{k}</div>)}
                <hr />

                <h2>d2 = Object.values(Day)</h2>
                // (parameter) k: string | Day
                {d2.map((k, i) => <div key={i}>{k}</div>)}
                <br />
                {d2_1} //  d2[1] // const d2_1: string | Day
                <hr />

                <h2>d3 = Object.entries(Day)</h2>
                // (parameter) k: [string, string | Day]
                {d3.map((k, i) => <div key={i}>{k}</div>)}
                <hr />

                <h2>d4 = {'Object.keys(Day) as Array<keyof typeof Day>'}</h2>
                // (parameter) k: "Sunday" | "Monday"
                {d4.map((k, i) => <div key={i}>{k}</div>)}
                <hr />

                <h2>keyNum = string[] = d1.filter((k: any) =&gt; typeof Day[k] === "number")</h2>
                // (parameter) k: string
                {keyNums.map((k, i) => <div key={i}>{k}</div>)}
                <hr />

                <h2>keyStr = string[] = d1.filter((k: any) =&gt; typeof Day[k] === "string")</h2>
                // (parameter) k: string
                {keyStrs.map((k, i) => <div key={i}>{k}</div>)}

                <hr />
            </div>
            <div>
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



const defaultStartAt = "10:00"
const defaultEndAt = "19:00"

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

// デフォ値
const defaultSchedule: Schedule = {
    [Day.Sunday]: { startAt: defaultStartAt, endAt: defaultEndAt },
    [Day.Monday]: { startAt: defaultStartAt, endAt: defaultEndAt },
}

// // サーバーから受け取るもの。実装したら消す。
// const gotScheduleSaverData = {
//     ...defaultSchedule,
//     [Day.Sunday]: { startAt: "48:00", endAt: "72:00" }
// }
