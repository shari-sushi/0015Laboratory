import React from 'react';
import ReactPlayer from 'react-player/youtube';

type ReactPlayerYoutubeProps = {
  url: string;
  start: number;
};

export const ReactPlayerYoutube: React.FC<ReactPlayerYoutubeProps> = ({ url, start }) => {
  return (
    <ReactPlayer
      url={url}
      controls={true}
      config={{ playerVars: { start: { start } } }}
    />
  );
};

////////////////////
type ReactPlayerYoutubeProps2 = {
  url: string;

};

export const ReactPlayerYoutube2: React.FC<ReactPlayerYoutubeProps2> = ({ url }) => {
  return (
    <ReactPlayer
      url={url}
      controls={true}
    />
  );
};
