import React, { useContext, useEffect, useState, createContext } from "react"
import Link from "next/link"

export default function Home() {
    const [videoId, setVideoId] = useState("2T4kKYAJrAM")
    const [start, setStart] = useState(0);

    const settinghandler = (videoId: string, time: number) => {
        setVideoId(videoId)
        setStart(time)
    }

    // 一度動画が再生し始めるまで遅延させれば一応の期待通りの動作となる。
    // ただ、遅延時間はユーザーの環境によるだろうから平均的なユーザー体験は下がりそう
    const handlerDelayBySetTimeOuT = (videoId: string, time: number) => {
        setVideoId(videoId)
        setTimeout(function () {
            setStart(time);
        }, 1300); //local環境で、1000ms, 1300ms:〇も✖も
    }
    // const handlerDelayFrame = (videoId: string, time: number) => {
    //     setVideoId(videoId)
    //     requestAnimationFrame(function () {
    //         setStart(time);
    //     });
    // }

    return (
        <>
            <Link href="/">Home</Link>
            <h1>react-youtube3 </h1>
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
            <button onClick={() => setStart(300)}>5分</button>
            <button onClick={() => setStart(600)}>10分</button>
            <button onClick={() => setStart(900)}>15分</button>
            <button onClick={() => setStart(1200)}>20分</button>
            <button onClick={() => setStart(1800)}>30分</button>
            <br /><br />
            ボタンじゃなくてリンクが良い <br />
            <Link href="#" onClick={() => settinghandler("wBjhxyFU3EY", 30)}>wBjhxyFU3EYの30秒にセット</Link><br />
            <button onClick={() => handlerDelayBySetTimeOuT("wBjhxyFU3EY", 30)}>1800ms遅延</button><br />
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
    // time = this.props.time
    constructor(props: YouTubePlayerProps) {
        console.log("props(super前)", props) // 0
        console.log("props.time", props.time)
        console.log("props.videoId", props.videoId)

        // 親クラスのコンストラクタを呼び出せる。
        // 結果として、propsを初期化するので、Reactコンポーネントのthis.propsプロパティを使える。
        // といいつつ、console.logした結果、前後で変化見られず。
        super(props);

        console.log("props (super後)", props)

        this.state = {
            player: null,
        };

        this.playerRef = React.createRef();
    }

    // renderメソッドよりも後で呼び出される
    componentDidMount() {
        if (this.state.player && this.props.time) {
            this.state.player.playVideo();
            // ↓(動画指定と同時になるので)効果なし
            // this.state.player.seekTo(0);

            // ↓これ機能しないの意味わからん
            // this.state.player.seekTo(this.props.time);
        }
        // this.state.player.event.onReady()
    }

    // renderメソッドよりも後で呼び出される
    // 機能してない？？？？
    componentDidUpdate(prevProps: YouTubePlayerProps) {
        // 機能するどころか(なんの挙動も示さないくせに)、
        // ２つの動画を瞬時に1→2→1のように遷移させるとエラーとなる
        // if (prevProps.videoId !== this.props.videoId) {
        // this.state.player.playVideo();
        // this.state.player.seekTo(this.props.time);

        // ↓(動画指定と同時では)効果なし(両方)
        // this.changeTime(0);
        // this.state.player.seekTo(0);
        // }
        if (prevProps.time !== this.props.time) {
            this.changeTime(this.props.time); //必須
        }
    }

    // どこかで使えると思うんだけど…
    // this.state.player.loadVideoById({
    //     vudeoId: this.props.videoId,
    //     startSeconds: this.props.time
    // })

    // この状態で、onRaedyそのものをコメントアウトすると時間セットできなくなる謎
    onReady = (event: { target: any }) => {
        this.setState({
            player: event.target,
        });
        // event.target.playVideo();
        event.target.seekTo(this.props.time);

        // (動画指定と同時では)↓効果なし
        // ↓効果なし
        // event.target.seekTo(0);
    };

    changeTime = (time: number) => {
        console.log('seeking to: ' + time);
        if (this.state.player) {
            this.state.player.playVideo();
            this.state.player.seekTo(time); //必須

            // ↓(動画指定と同時では)効果なし(動画指定と同時では)
            // this.state.player.seekTo(0);
        }
    };

    render() {
        const { videoId } = this.props;
        const { time } = this.props;
        console.log("this.props", this.props)
        const opts: any = {
            width: '560',
            height: '315',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1, //自動再生に必須だが、これだけだとダメな時もある様子…。
                // start: time, //これがあると時間が上書きされる(seekToが機能しない)
                controls: 1,
            },
            // startSeconds:time, //これも効果なし
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