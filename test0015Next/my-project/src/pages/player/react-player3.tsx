import React, { useContext, useEffect, useState, createContext } from "react"
import Link from "next/link"
import { ReactPlayerYoutube2 } from "@/component/ReactPlayer"
import ReactPlayer from 'react-player/youtube';

export default function Home() {
    const [start, setStart] = useState(120);
    const [url, setUrl] = useState("https://youtu.be/2T4kKYAJrAM?t=886");
    const [id, setId] = useState(0); //needless

    const cliclhandler = (url: string, start: number, id: number) => {
        setStart(start);
        setId(id + 1);
        setUrl(url)
    }

    return (
        <>
            <Link href="/">Home</Link>
            <h1>react-player/youtube 3</h1>
            <div className="App">
                <Player keyId={id} start={start} url={url} />
                <p>{start} seconds</p>
                <button onClick={() => { setStart(300); setId(id + 1) }}>{"Change start"}</button> <br />
                <button onClick={() => cliclhandler("https://www.youtube.com/watch?v=k_uDlZN6ypk", 0, id)}>k_uDlZN6ypk, 0sec</button>
                <button onClick={() => cliclhandler("https://www.youtube.com/watch?v=k_uDlZN6ypk", 300, id)}>k_uDlZN6ypk, 5min</button><br />
                <button onClick={() => cliclhandler("https://www.youtube.com/watch?v=DREoOy4Q0LU", 0, id)}>DREoOy4Q0LU, 0sec</button>
                <button onClick={() => cliclhandler("https://www.youtube.com/watch?v=DREoOy4Q0LU", 300, id)}>DREoOy4Q0LU, 5nub</button><br />
                <br />
                startで設定しても、上書きされる（明確な視聴履歴がある場合のみ）
            </div>
        </>
    );
}


type Player = {
    url: string,
    start: number,
    keyId: number

}
const Player = ({ url, start, keyId }: Player) => {
    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    console.log(start);
    const config = {
        playerVars: {
            start,
            // origin: url
        }

    };

    return (
        <>
            {hasWindow &&
                <ReactPlayer
                    key={keyId}
                    controls={true}
                    config={config}
                    playing={true}
                    url={url}
                    volume={0.2}
                    width="480px"
                    height="260px"
                />}
        </>
    );
};