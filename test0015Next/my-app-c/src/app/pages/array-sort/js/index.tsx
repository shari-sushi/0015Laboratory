import React from "react"
import Link from "next/link"
import { ReactPlayerYoutube } from "@/component/ReactPlayer"

export default function Home() {
    const array = ["a", "b", "あ", "い", "AB", "A", "AB", "AC", "0", "1", "2", "", "愛", "阿部"]

    return (
        <>
            <li><Link href="/array-sort/js/sort">.sort()</Link></li>
            <li><Link href="/array-sort/js/toSorted">.toSorted()</Link></li>


            <div className="pt-10 mt-10" >
                これはおまけの宝鐘マリン動画
                <ReactPlayerYoutube url={"https://www.youtube.com/watch?v=wBjhxyFU3EY"} start={60} />
            </div>
            <div>
            </div>
        </>
    )
}