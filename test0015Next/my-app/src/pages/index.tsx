import React, { useContext, useEffect, useState, createContext } from "react"
import Link from "next/link"

export default function Home() {

    return (
        <>
            <h1>home</h1>
            <Link href="/file">file</Link><br />
            <br />
            <Link href="/usecontext">useContext</Link><br />
            <br />
            <Link href="/tutorial/react-table">tanstacl table チュート</Link><br />

            <li>player</li>
            <Link href="/player/react-youtube">react-youtube</Link>：時間指定意味無し<br />
            <Link href="/player/react-youtube2">react-youtube2</Link>:再生できなかった<br />
            <Link href="/player/react-youtube3">react-youtube3</Link>：時間指定意味無し時間指定では２回操作が必要<br />
            <Link href="/player/react-youtube4">react-youtube4</Link>:<br />
            <Link href="/player/react-youtube5">react-youtube5</Link>:<br />
            <Link href="/player/react-youtube5">react-youtube6</Link>:<br />
            <Link href="/player/react-player">react-player</Link>：時間指定意味無し<br />
            <Link href="/player/react-player2">react-player2</Link><br />
            <Link href="/player/react-player3">react-player3</Link><br />

            <li>convert</li>
            秒とhh:mm:ssの変換 <br />
            <Link href="/convert/time1">time1</Link><br />

            <br />

            <h1 className=" font-bold underline">
                h1タグ: You can use Tailwind
            </h1>
            <a className="  underline">
                aタグ: You can use Tailwind
            </a>
            <br />

            <h1 className=" font-bold underline">Sanstack Table (React-Table)</h1><br />
            <li><Link href="/react-table/filter">filter</Link></li>
            <li><Link href="/tanstacktable">tanstacktable</Link></li>
        </>
    )
}