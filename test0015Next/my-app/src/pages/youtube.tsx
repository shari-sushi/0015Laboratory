import React, { useContext, useEffect, useState, createContext } from "react"
import Link from "next/link"
import { YoutubePlayer } from "@/component/YoutubePlayer"

export default function Home() {
    const [videoId, setVideoId] = useState("")
    const [start, setStart] = useState(1);
    return (
        <>
            <Link href="/">Home</Link>
            <h1>react-youtube</h1>
            <YoutubePlayer videoId={videoId} start={start} />
            <button onClick={() => setVideoId("zwSRD65SFQI")}>zwSRD65SFQIにセット</button>
            <button onClick={() => setVideoId("48xDoCnkayc")}>48xDoCnkaycにセット</button>

            <br />

            <button onClick={() => setStart(1)}>1秒にセット</button>
            <button onClick={() => setStart(60)}>1分にセット</button>
            <button onClick={() => setStart(300)}>5分にセット</button>
            <br />
            onClickでuseStateを起動。
            一瞬だけその時間になるが、<br />
            すぐに別の時間に上書きされる。<br /><br />
            恐らくは直近に見ていた時間がキャッシュされており<br />
            それに上書きされている。<br />
            ------------------------------------------------------------------<br />
            urlと秒数を固定しておけば、期待通りの時間で再生される。<br />
            (1分にセットしており、何度リロードしても1分に戻る)<br />
            と思いきや、タイムバーを１度いじったら、<br />
            何度リロードしても上書きされるようになった。<br />
            <YoutubePlayer videoId={"wBjhxyFU3EY"} start={60} />


        </>
    )
}