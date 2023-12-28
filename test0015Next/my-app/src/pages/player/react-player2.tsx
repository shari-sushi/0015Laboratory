import React, { useContext, useEffect, useState, createContext } from "react"
import Link from "next/link"
import { ReactPlayerYoutube2, ReactPlayerYoutube } from "@/component/ReactPlayer"

export default function Home() {

    const primaryVideoId = "https://youtu.be/AlHRqSsF--8"
    const [videoId, setVideoId] = useState(primaryVideoId)
    const [start, setStart] = useState(1);
    const url = videoId + "&t=" + start

    return (
        <>
            <Link href="/">Home</Link>
            <h1>react-youtube2</h1>
            <div>
                ↓ urlのみ
                <ReactPlayerYoutube2 url={videoId} /><br />
                ↓ urlに時間指定付与
                <ReactPlayerYoutube2 url={url} /><br />

                ↓ urlとは別にstart時間を指定
                <ReactPlayerYoutube url={videoId} start={start} /><br />

                <button onClick={() => setVideoId("https://www.youtube.com/watch?v=zwSRD65SFQI")}>zwSRD65SFQIにセット</button>
                <button onClick={() => setVideoId("https://www.youtube.com/watch?v=48xDoCnkayc")}>48xDoCnkaycにセット</button>

                <br />
                <button onClick={() => setStart(1)}>1秒にセット</button>
                <button onClick={() => setStart(60)}>1分にセット</button>
                <button onClick={() => setStart(300)}>5分にセット</button>
                <br />


            </div>
            <div>
            </div>
        </>
    )
}