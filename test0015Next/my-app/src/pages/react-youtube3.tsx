import React, { useContext, useEffect, useState, createContext } from "react"
import Link from "next/link"

export default function Home() {
    const [videoId, setVideoId] = useState("wBjhxyFU3EY")
    const [start, setStart] = useState(0);

    console.log(start)
    const settinghandler = () => {
        setVideoId("wBjhxyFU3EY")
        setStart(30)
    }

    return (
        <>
            <Link href="/">Home</Link>
            <h1>react-youtube </h1>
            <h2>use seekTo, commponentDidUpdate</h2>

            <YouTubePlayer time={start} videoId={videoId} />
            <button onClick={() => setVideoId("zwSRD65SFQI")}>zwSRD65SFQIにセット</button>
            <button onClick={() => setVideoId("48xDoCnkayc")}>48xDoCnkaycにセット</button>

            <br />

            <button onClick={() => setStart(0)}>0秒にセット</button>
            <button onClick={() => setStart(60)}>1分にセット</button>
            <button onClick={() => setStart(300)}>5分にセット</button>
            <br />
            ボタンじゃなくてリンクが良い <br />
            <Link href="#" onClick={() => settinghandler()}>wBjhxyFU3EYの30秒にセット</Link>
            <br />
            <br />
            memo
            <li>再生中に時間操作→ok: urlは同じなら操作しても大丈夫</li>
            <li>別動画にする→NG: 繊維するも再生されず、手動で再生すると時間が別もの。</li>
            <li>別動画かつ時間指定→NG: 再生止まり、手動で再生すると時間が別もの。</li>
            <li>動画遷移、時間操作→時間操作時に自動さいせいされるが、別の時間になる。</li>
            <br />
            <li>動画遷移時に自動再生させる必要がある。</li>
            <br />

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
    // time = this.props.time
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
            this.state.player.getPlayerState(1)
        }
        // else if
        // (this.state.player) {
        //     console.log("aaa", this.state.player)
        //     this.state.player.seekTo(0);
        //     console.log(this.state.player)
        // }
    }
    componentDidUpdate(prevProps: YouTubePlayerProps) {
        if (prevProps.time !== this.props.time) {
            this.changeTime(this.props.time);
            // this.state.player.getPlayerState(1)
        }
        // else if (this.state.player) {
        //     console.log("this.props.time aaa", this.props.time)
        //     this.changeTime(this.props.time);
        //     // this.state.player.seekTo(0);
        // }
    }

    onReady = (event: { target: any }) => {
        this.setState({
            player: event.target,
        });
        event.target.playVideo();
        event.target.seekTo(this.props.time);
    };

    // const onReady = (event: { target: any }) => {
    //     setPlayer(event.target);
    //     event.target.seekTo(time);
    //     event.target.playVideo();
    // };


    changeTime = (time: number) => {
        console.log('seeking to: ' + time);
        if (this.state.player) {
            this.state.player.playVideo();
            this.state.player.getPlayerState(1)
            this.state.player.seekTo(time);
        }
    };

    render() {
        const { videoId } = this.props;
        const opts: any = {
            width: '560',
            height: '315',
            // playing: 1,
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

// 公式　https://developers.google.com/youtube/iframe_api_reference?hl=ja#Functions
// パラメータ（省略可能）はオブジェクト構文でのみサポートされており、
// playVideo() が呼び出されたときに動画の再生を停止する位置（時間）を浮動小数点数または整数で指定します。
// endSeconds の値を指定して seekTo() を呼び出すと、endSeconds の値は無効になります。

//// player.seekTo(seconds:Number, allowSeekAhead:Boolean):Void
// 動画を指定された時間シークします。
// この関数を呼び出したときにプレーヤーが一時停止している場合は一時停止のままになり、
// その他の状態（playing、video cued など）から呼び出した場合は、動画が再生されます。