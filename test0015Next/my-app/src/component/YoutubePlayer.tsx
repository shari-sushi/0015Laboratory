import YouTube from 'react-youtube';
// import '../Youtube.module.css';

type Options = React.ComponentProps<typeof YouTube>['opts'];

type YoutubePlayerProps = {
  videoId: string;
  start?: number;
  opts?: Options;
  onReady?: (event: { target: YT.Player }) => void;
};

const onPlayerReady = (event: { target: YT.Player }) => {
  // access to player in all event handlers via event.target
  event.target.pauseVideo();
}

// 単一動画を再生
export const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ videoId, start, opts = {
  // width: 1920,  height: 1080,
  // width: 450, height: 253,
  width: 400, height: 225,
  // width: 640,  height: 360,
  playerVars: {
    autoplay: 1,
    start: start,
    playsinline: 1,
    // mute: 1,             
    loop: 1,
    // end:,
  },
},
  onReady = onPlayerReady }) => {
  return <YouTube videoId={videoId} opts={opts} onReady={onReady} />;
};

// youtueプレイリストを再生
export function YoutubePlayListPlayer() {
  const opts = {
    height: 390,
    width: 640,
    playerVars: {
      listType: 'playlist',
      list: 'PLeeZByIMvayf2oJoWXA_4YHzBC6DCDyx5',
      start: 10,
      // end:20,
    },
  };

  return <YouTube opts={opts} />;
}