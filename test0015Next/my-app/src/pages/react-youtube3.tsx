import React, { useContext, useEffect, useState, createContext } from "react"
import Link from "next/link"

export default function Home() {
    const [videoId, setVideoId] = useState("")
    const [start, setStart] = useState(1);

    console.log(start)
    const settinghandler = () => {
        console.log(1)
        setVideoId("wBjhxyFU3EY")
        console.log(2)
        setStart(30)
        console.log(3)
    }


    // const YourComponent = () => {
    //     useEffect(() => {
    //         // ページの読み込み後に実行される
    //         console.log(document.getElementById('NEXT_DATA'));
    //     }, [])
    // };

    return (
        <>
            <YouTubePlayer time={start} videoId={videoId} />

            <Link href="/">Home</Link>
            <h1>react-youtube</h1>
            {/* <YoutubePlayer videoId={videoId} start={start} /> */}
            <button onClick={() => setVideoId("zwSRD65SFQI")}>zwSRD65SFQIにセット</button>
            <button onClick={() => setVideoId("48xDoCnkayc")}>48xDoCnkaycにセット</button>

            <br />

            <button onClick={() => setStart(1)}>1秒にセット</button>
            <button onClick={() => setStart(60)}>1分にセット</button>
            <button onClick={() => setStart(300)}>5分にセット</button>
            <br />
            <button onClick={() => settinghandler()}>wBjhxyFU3EYの30秒にセット</button>
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
            {/* <YoutubePlayer videoId={"wBjhxyFU3EY"} start={60} /> */}
            {/* <script >function(){document.getElementById('__NEXT_DATA__');}</script> */}

        </>
    )
}


import YouTube from 'react-youtube';

type YouTubePlayerProps = {
    videoId: string;
    time: number;
}

interface YouTubePlayerState {
    player: any;
}

class YouTubePlayer extends React.Component<YouTubePlayerProps, YouTubePlayerState> {
    private playerRef: React.RefObject<YouTube>;
    time = this.props.time
    constructor(props: YouTubePlayerProps) {
        console.log("props.time", props.time)
        console.log("props.videoId", props.videoId)
        super(props);

        this.state = {
            player: null,
        };

        this.playerRef = React.createRef();
    }

    componentDidMount() {
        if (this.state.player && this.props.time) {
            this.state.player.seekTo(this.props.time);
        }
    }
    componentDidUpdate(prevProps: YouTubePlayerProps) {
        if (prevProps.time !== this.props.time) {
            this.changeTime(this.props.time);
        }
    }
    onReady = (event: { target: any }) => {
        // access to player in all event handlers via event.target
        this.setState({
            player: event.target,
        });
        event.target.playVideo();
    };
    // this.state.player.seekTo(time)
    changeTime = (time: number) => {
        console.log('seeking to: ' + time);
        if (this.state.player) {
            this.state.player.seekTo(time);
            this.state.player.playVideo();
        }
    };

    render() {
        const { videoId } = this.props;
        const opts: any = {
            width: '560',
            height: '315',
        };

        return (
            <div>
                <YouTube
                    videoId={videoId}
                    opts={opts}
                    onReady={this.onReady}
                    ref={this.playerRef}
                />
            </div>
        );
    }
}

// const AA = new YouTubePlayer({time, videoId}:YouTubePlayerProps){
// time =0,
// videoId =
// }