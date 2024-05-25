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
            <h1>react-player/youtube 5</h1>
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

    // const useYoutube = (callback: any) => {
    //     useEffect(() => {
    //         if (!window.YT) {
    //             var tag = document.createElement('script');
    //             tag.src = 'https://www.youtube.com/iframe_api';
    //             var firstScriptTag = document.getElementsByTagName('script')[0];
    //             firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    //             tag.onload = callback;
    //         } else {
    //             callback();
    //         }
    //     }, []);
    // };
    // useYoutube()

    // onYouTubeIframeAPIReady();
    // const onReady = () => {
    //     player.seekTo(start)
    // }

    const [onStartStart, setOnStartStart] = useState(120)
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
                    onStart={() => setOnStartStart(start)}
                    onReady={() => setOnStartStart(start)}
                // onStart={onReady}
                // onReady={onReady}
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
/////////////////////////////////////////////////////////////////////////
// var player: any;
// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         height: '360',
//         width: '640',
//         events: {
//             'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange,
//         }
//     });
// }

// function onPlayerReady(event: any) {
//     event.target.playVideo();
// }
// var done = false;
// function onPlayerStateChange(event: any) {
//     if (event.data == YT.PlayerState.PLAYING && !done) {
//         // if (event.data === window.YT.PlayerState.PLAYING && !done) {
//         setTimeout(stopVideo, 6000);
//         done = true;
//     }
// }
// function stopVideo() {
//     player.stopVideo();
// }

// interface MyWindow extends Window {
//     onYouTubeIframeAPIReady(): void;
// }
// declare var window: MyWindow;

/////////////////////////////////////////////////////////////////////////


// type ReactPlayerPlayerProps = {
//     videoId: string;
//     time: number;
// }

// interface ReactPlayerPlayerState {
//     player: any;
// }

// class ReactPlayerPlayer extends React.Component<ReactPlayerPlayerProps, ReactPlayerPlayerState> {
//     private playerRef: React.RefObject<ReactPlayer>;
//     constructor(props: ReactPlayerPlayerProps) {
//         console.log("props(super前)", props) // 0
//         super(props);

//         this.state = {
//             player: null,
//         };

//         //これが無いと動画が切り替わらなくなる。時間はセットできるなぜ。
//         this.playerRef = React.createRef();
//     }

//     // renderメソッドよりも後で呼び出される
//     componentDidMount() {
//         if (this.state.player && this.props.time) {
//             this.state.player.playVideo();
//             // ここでonSeekが機能しないの意味わからん
//             this.state.player.seekTo(this.props.time);

//         }
//     }

//     componentDidUpdate(prevProps: ReactPlayerPlayerProps) {

//         if (prevProps.time !== this.props.time) {
//             this.changeTime(this.props.time); //必須
//             console.log("check")
//         }
//     }

//     // この状態で、onRaedyそのものをコメントアウトすると時間セットできなくなる謎
//     onReady = (event: { target: any }) => {
//         this.setState({
//             player: event.target,
//         });
//         event.target.seekTo(this.props.time);
//     }

//     changeTime = (time: number) => {
//         console.log('seeking to: ' + time);
//         if (this.state.player) {
//             this.state.player.playVideo();
//             this.state.player.seekTo(time);
//         }
//     };

//     render() {
//         const { videoId } = this.props;
//         // const start = this.props.time;
//         console.log("this.props", this.props)
//         const opts: any = {
//             width: '560',
//             height: '315',
//             playerVars: {
//                 // https://developers.google.com/ReactPlayer/player_parameters
//                 autoplay: 1, //自動再生に必須だが、これだけだとダメな時もある様子…。
//                 // start: start, //これがあると時間が上書きされる
//                 controls: 1,
//             },
//         };

//         return (
//             <div>
//                 <ReactPlayer
//                     videoId={videoId}
//                     opts={opts}
//                     onReady={this.onReady}
//                     ref={this.playerRef}
//                 />
//             </div>
//         );
//     }
// }