import React, { useContext, useEffect, useState, createContext } from "react"
import Link from "next/link"


// 仮説
// ~Mountとかで先に渡した値をonReadyに渡し直してるから動かない

export default function Home() {
    const [videoId, setVideoId] = useState("2T4kKYAJrAM")
    const [start, setStart] = useState(0);

    const settinghandler = (videoId: string, time: number) => {
        setVideoId(videoId)
        setStart(time)
    }

    return (
        <>
            <Link href="/">Home</Link>
            <h1>react-youtube4 </h1>
            <h2>use seekTo, commponentDidUpdate</h2>

            <YouTubePlayer time={start} videoId={videoId} />

            {/* 0秒にはならない */}
            <button onClick={() => { setVideoId("zwSRD65SFQI"); setStart(0); }}>zwSRD65SFQIの0秒にセット</button>

            <button onClick={() => setVideoId("48xDoCnkayc")}>48xDoCnkaycにセット</button>
            <button onClick={() => setVideoId("2T4kKYAJrAM")}>2T4kKYAJrAMにセット</button>
            <br />
            時間をセット：
            <button onClick={() => setStart(0)}>0秒</button>
            <button onClick={() => setStart(60)}>1分</button>
            <button onClick={() => setStart(1200)}>20分</button>
            <br /><br />
            ボタンじゃなくてリンクが良い <br />
            <Link href="#" onClick={() => settinghandler("wBjhxyFU3EY", 30)}>wBjhxyFU3EYの30秒にセット</Link><br />
            requestAnimationFrameはエラーの原因になるっぽい。まあ、描画じゃなくてonReadyでやれって話よな… <br />
            {/* <button onClick={() => handlerDelayFrame("wBjhxyFU3EY", 30)}>描画完了まで遅延させてみる</button> */}
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

// commit用メモ
// 自動再生付与

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
    constructor(props: YouTubePlayerProps) {
        console.log("props(super前)", props) // 0
        super(props);

        this.state = {
            player: null,
        };

        //これが無いと動画が切り替わらなくなる。時間はセットできるなぜ。
        this.playerRef = React.createRef();
    }

    // renderメソッドよりも後で呼び出される
    componentDidMount() {
        if (this.state.player && this.props.time) {
            this.state.player.playVideo();
            // ここでonSeekが機能しないの意味わからん
            this.state.player.seekTo(this.props.time);

        }
    }

    componentDidUpdate(prevProps: YouTubePlayerProps) {

        if (prevProps.time !== this.props.time) {
            this.changeTime(this.props.time); //必須
            console.log("check")
        }
    }

    // この状態で、onRaedyそのものをコメントアウトすると時間セットできなくなる謎
    onReady = (event: { target: any }) => {
        this.setState({
            player: event.target,
        });
        event.target.seekTo(this.props.time);
    }

    changeTime = (time: number) => {
        console.log('seeking to: ' + time);
        if (this.state.player) {
            this.state.player.playVideo();
            this.state.player.seekTo(time);
        }
    };

    render() {
        const { videoId } = this.props;
        // const start = this.props.time;
        console.log("this.props", this.props)
        const opts: any = {
            width: '560',
            height: '315',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1, //自動再生に必須だが、これだけだとダメな時もある様子…。
                // start: start, //これがあると時間が上書きされる
                controls: 1,
            },
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



// ダメ
// componentDidUpdate(prevProps: YouTubePlayerProps) {
//     if (prevProps.videoId !== this.props.videoId) {
//         this.state.player.playVideo();
//         this.state.player.seekTo(this.props.time);
//     }
//     if (prevProps.time !== this.props.time) {
//         this.changeTime(this.props.time);
//     }
// }

// ダメ
// componentDidUpdate(prevProps: YouTubePlayerProps) {
//     if (prevProps.videoId !== this.props.videoId) {
//         this.state.player.loadVideoById({ videoId: this.props.videoId, startSeconds: this.props.time });
//     }
//     if (prevProps.time !== this.props.time && prevProps.videoId === this.props.videoId) {
//         this.changeTime(this.props.time);
//     }
// }