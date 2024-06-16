import React, { useContext, useEffect, useState, createContext } from "react"
import Link from "next/link"
import ReactPlayer from 'react-player/youtube';

export default function Home() {
    const [start, setStart] = useState(120);
    const [url, setUrl] = useState("https://youtu.be/2T4kKYAJrAM?t=886");

    const cliclhandler = (url: string, start: number) => {
        setStart(start);
        setUrl(url)
    }

    return (
        <>
            <Link href="/">Home</Link>
            <h1>react-player/youtube 4</h1>
            <div className="App">
                <Player start={start} url={url} />
                <p>{start} seconds</p>
                <button onClick={() => cliclhandler("https://www.youtube.com/watch?v=k_uDlZN6ypk", 1)}>k_uDlZN6ypk, 0sec</button>
                <button onClick={() => cliclhandler("https://www.youtube.com/watch?v=k_uDlZN6ypk", 300)}>k_uDlZN6ypk, 5min</button><br />
                <button onClick={() => cliclhandler("https://www.youtube.com/watch?v=DREoOy4Q0LU", 1)}>DREoOy4Q0LU, 0sec</button>
                <button onClick={() => cliclhandler("https://www.youtube.com/watch?v=DREoOy4Q0LU", 300)}>DREoOy4Q0LU, 5min</button><br />
                <br />
                startで設定しても、上書きされる（明確な視聴履歴がある場合のみ）
            </div>
        </>
    );
}

type Player = {
    url: string,
    start: number,

}

const Player = ({ url, start }: Player) => {
    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    const [onStartStart, setOnStartStart] = useState(0)
    // const config = {
    //     playerVars: {
    //         start, // ダメ
    //         // start: start, //
    //         // start: { start },
    //         // origin: url
    //     }
    // };
    return (
        <>
            {hasWindow &&
                <ReactPlayer
                    url={url}
                    playing
                    controls
                    config={{ playerVars: { start: onStartStart } }} // start= 120
                    // onStart={() => setOnStartStart(start)}
                    onReady={() => setOnStartStart(start)}
                />
            }
        </>

        // <ReactPlayer
        //     controls={true}
        //     config={config}
        //     playing={true}
        //     url={url}
        //     volume={0.2}
        //     width="480px"
        //     height="260px"
        // />
    );
};
