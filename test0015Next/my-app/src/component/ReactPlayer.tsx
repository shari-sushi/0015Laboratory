import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';

type ReactPlayerYoutubeProps = {
  url: string;
  start: number;
};

export const ReactPlayerYoutube: React.FC<ReactPlayerYoutubeProps> = ({ url, start }) => {

  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);
  console.log("start in ReactPlayerYouTube", start)

  const onReady = (event: { target: any }) => {
    const setState = ({
      player: event.target,
    });
    // event.target.playVideo();
    event.target.seekTo(start);

    // (動画指定と同時では)↓効果なし
    // ↓効果なし
    // event.target.seekTo(0);
  };
  return (
    <>
      {hasWindow &&
        <ReactPlayer
          url={url}
          controls={true}
          start={start}  //効果なし
          config={{
            playerVars: {
              autoplay: 1,
              // origin: { url } //動作確認してない
              // start: { start } //効果なし
              // start: start,  //効果なし
              // satrtSeconds:start,
            },
          }}
          seekTo={start}
        // onReady={onReady}
        />}
    </>
  );
};

////////////////////
type ReactPlayerYoutubeProps2 = {
  url: string;
};

export const ReactPlayerYoutube2: React.FC<ReactPlayerYoutubeProps2> = ({ url }) => {
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);
  return (
    <>
      {hasWindow && <ReactPlayer
        url={url}
        controls={true}
      />
      }
    </>
  );
};
