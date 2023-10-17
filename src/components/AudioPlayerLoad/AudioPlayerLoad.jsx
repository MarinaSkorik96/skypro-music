import React from "react";
import * as S from "../AudioPlayer/AudioPlayerStyles.jsx"


const AudioPlayerLoad = () => {
  return (

    <S.TrackPlayContain>
      <div className="track-play__image track-play__image-skeleton">
      </div>
      <div className="track-play-skeleton">
      </div>
      <div className="track-play-skeleton">
      </div>
    </S.TrackPlayContain>

  );
};

export default AudioPlayerLoad;
