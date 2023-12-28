import React, { useContext, useEffect, useState, createContext } from "react"
import Link from "next/link"
import { YoutubePlayer2 } from "@/component/ReactYoutube"

export default function Home() {
    const [videoId, setVideoId] = useState("")
    const [start, setStart] = useState(1);
    const videoIdAndStart = videoId + "&t=" + start + "s"
    console.log(videoIdAndStart)
    return (
        <>
            <Link href="/">Home</Link>
            <h1>react-youtube2</h1>
            再生できなかった<br />
            <YoutubePlayer2 videoId={videoIdAndStart} />
            <button onClick={() => setVideoId("zwSRD65SFQI")}>zwSRD65SFQIにセット</button>
            <button onClick={() => setVideoId("48xDoCnkayc")}>48xDoCnkaycにセット</button>

            <br />

            <button onClick={() => setStart(1)}>1秒にセット</button>
            <button onClick={() => setStart(60)}>1分にセット</button>
            <button onClick={() => setStart(300)}>5分にセット</button>
            <br />
            videoIdとstartを個別に渡すとそのidで<br />
            動画を取得→再生時間をプレイヤーが合わせる。<br />
            となるので、<br />
            videoIdにstartの時間を結合し、videoIdのみ渡してみた。<br />
            ---------------------------------------------------------------<br />
            urlと秒数を以下のとおりハードコード
            {/* videoId= "48xDoCnkayc&t=1s" */}
            {/* <YoutubePlayer2 videoId={"wBjhxyFU3EY&t=1"} /> */}
            <YoutubePlayer2 videoId={"48xDoCnkayc&t=1s "} />

            {/* https://www.youtube.com/watch?v=48xDoCnkayc&t=1s */}
        </>
    )
}