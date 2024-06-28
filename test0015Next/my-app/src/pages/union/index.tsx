import "@/globals.css";
import { useEffect, useState } from "react"

export default function Union() {
    const [newSchedule, setNewSchedule] = useState<Schedule>(defaultSchedule)
    const [newSchedule2, setNewSchedule2] = useState<Schedule>(defaultSchedule)

    const type = typeof defaultSchedule.Monday // string
    const onclick = (day: Day, time: string) => {
        console.log("aaa")
        setNewSchedule({
            ...newSchedule,
            // // これはok
            // Monday: { startAt: "00:00", endAt: "24:00" }
            Monday: { startAt: newSchedule[day].startAt, endAt: time }
        })
    }

    const day: Day = "Monday"
    // const day: Day = keyof Day //eroor

    return (
        <div className="bg-gray-900">
            <div>
                {newSchedule.Monday.startAt} ~ {newSchedule.Monday.endAt}
            </div>
            <button className="border bg-gray" onClick={() => onclick(day, "24:00")}>click</button>
            <div>
                {type}
            </div>
        </div>
    )
}

type Day = "Sunday" | "Monday" | "Tuesday"

type DndDaySchedule = {
    startAt: string,
    endAt: string
}

type Schedule = {
    [key in Day]: DndDaySchedule
}

const defaultStartAt = "10:00"
const defaultEndAt = "19:00"

const defaultSchedule: Schedule = {
    Sunday: { startAt: defaultStartAt, endAt: defaultEndAt },
    Monday: { startAt: defaultStartAt, endAt: defaultEndAt },
    Tuesday: { startAt: defaultStartAt, endAt: defaultEndAt },
    //// 不足があるとエラー
    // プロパティ 'Tuesday' は型 '{ Sunday: { startAt: string; endAt: string; }; 
    // Monday: { startAt: string; endAt: string; }; }' にありませんが、
    // 型 'Schedule' では必須です。

    //  重複が許されない
    // Monday: { startAt: defaultStartAt, endAt: defaultEndAt },

    // UNION型にないものも許されない
    // OOOO: { startAt: defaultStartAt, endAt: defaultEndAt },
}