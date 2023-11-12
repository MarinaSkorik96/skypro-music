import React, { useEffect } from "react";
import AudioPlayerLoad from "../AudioPlayerLoad/AudioPlayerLoad";
import { useContext, useState, useRef } from 'react';
import LoadingContext from '../../context';
import * as S from "./AudioPlayerStyles"
import { ProgresInputTrack, ProgresInputVolume } from "../ProgressInputs/ProgressInput";
import { useDispatch, useSelector } from 'react-redux';
import { getIsPlaing } from "../../store/slices/track";


const AudioPlayer = () => {
  const dispatch = useDispatch();


  const currentTrackS = useSelector(state => state.track.currentTrack)


  const { loading } = useContext(LoadingContext)
  const [isPlaying, setPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);


  const aRef = useRef(0);

  const handleStart = () => {
    aRef.current.play();
  };

  useEffect(handleStart, [currentTrackS])


  const handleStop = () => {
    aRef.current.pause();
  };

  function sToStr(s) {
    let m = Math.trunc(s / 60) + ''
    s = (s % 60) + ''
    let sec = Math.floor(s.padStart(2, 0))
    if (sec < 10) {
      sec = `0` + Math.floor(s.padStart(2, 0))
    }
    return m.padStart(2, 0) + ':' + `${sec}`
  }

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (aRef.current.currentTime && aRef.current.duration) {
        setCurrentTime(sToStr(aRef.current.currentTime))
        setDuration(sToStr(aRef.current.duration))
      } else {
        setCurrentTime(0)
        setDuration(0)
      }
    }
    aRef.current.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      aRef.current.removeEventListener('timeupdate', handleTimeUpdate)
      console.log('done')
    }
  }, [])

  const handleRepeat = () => {
    aRef.current.loop = !isRepeat;
    setIsRepeat(!isRepeat)
  };

  const awaitImplementation = () => {
    alert('Функционал еще не реализован');
  };

  return (
    <>
      <audio
        ref={aRef}
        src={currentTrackS.track_file}
        // controls="controls"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      ></audio>
      <S.Bar>
        <S.BarContent>
          <S.TimeCode >{currentTime} / {duration}</S.TimeCode>
          <ProgresInputTrack ref={aRef} />
          <S.BarPlayerBlock>
            <S.BarPlayer>
              <S.PlayerControls>
                <S.PlayerBtnPrev>
                  <S.PlayerBtnPrevSvg onClick={awaitImplementation} alt="prev">
                    <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                  </S.PlayerBtnPrevSvg>
                </S.PlayerBtnPrev>
                {isPlaying ?
                  <S.PlayerBtnPlay onClick={()=>{
                    handleStop();
                    dispatch(getIsPlaing(false));
                    }}>
                    <S.PlayerBtnPlaySvg as="svg" alt="play">
                      <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="5" height="19" fill="#D9D9D9" />
                        <rect x="10" width="5" height="19" fill="#D9D9D9" />
                      </svg>
                    </S.PlayerBtnPlaySvg>
                  </S.PlayerBtnPlay>
                  :
                  <S.PlayerBtnPlay onClick={()=>{
                    handleStart();
                    dispatch(getIsPlaing(true));
                    }}>
                    <S.PlayerBtnPlaySvg as="svg" alt="play">
                      <use xlinkHref="img/icon/sprite.svg#icon-play"></use>
                    </S.PlayerBtnPlaySvg>
                  </S.PlayerBtnPlay>

                }
                <S.PlayerBtnNext>
                  <S.PlayerBtnNextSvg onClick={awaitImplementation} alt="next">
                    <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                  </S.PlayerBtnNextSvg>
                </S.PlayerBtnNext>
                {isRepeat ?
                  <S.PlayerBtnRepeat onClick={handleRepeat}>
                    <S.PlayerBtnRepeatActiveSvg alt="repeat">
                      <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
                    </S.PlayerBtnRepeatActiveSvg>
                  </S.PlayerBtnRepeat>

                  :
                  <S.PlayerBtnRepeat onClick={handleRepeat}>
                    <S.PlayerBtnRepeatSvg alt="repeat">
                      <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
                    </S.PlayerBtnRepeatSvg>
                  </S.PlayerBtnRepeat>
                }
                <S.PlayerBtnShuffle>
                  <S.PlayerBtnShuffleSvg onClick={awaitImplementation} alt="shuffle">
                    <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
                  </S.PlayerBtnShuffleSvg>
                </S.PlayerBtnShuffle>
              </S.PlayerControls>

              <S.PlayerTrackPlay>

                {loading ? <AudioPlayerLoad /> :
                  <S.TrackPlayContain>
                    <S.TrackPlayImage>
                      <S.TrackPlaySvg alt="music">
                        <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                      </S.TrackPlaySvg>
                    </S.TrackPlayImage>
                    <S.TrackPlayAuthor>
                      <S.TrackPlayAuthorLink xlinkHref="http://">
                        {currentTrackS.name}
                      </S.TrackPlayAuthorLink>
                    </S.TrackPlayAuthor>
                    <S.TrackPlayAlbum>
                      <S.TrackPlayAlbumLink xlinkHref="http://">
                        {currentTrackS.author}
                      </S.TrackPlayAlbumLink>
                    </S.TrackPlayAlbum>
                  </S.TrackPlayContain>}

                <S.TrackPlayLikeDis>
                  <S.TrackPlayLike onClick={awaitImplementation}>
                    <S.TrackPlayLikeSvg alt="like">
                      <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                    </S.TrackPlayLikeSvg>
                  </S.TrackPlayLike>
                  <S.TrackPlayDislike onClick={awaitImplementation}>
                    <S.TrackPlayDislikeSvg alt="dislike">
                      <use xlinkHref="img/icon/sprite.svg#icon-dislike"></use>
                    </S.TrackPlayDislikeSvg>
                  </S.TrackPlayDislike>
                </S.TrackPlayLikeDis>
              </S.PlayerTrackPlay>
            </S.BarPlayer>
            <S.BarVolumeBlock>
              <S.VolumeContent>
                <S.VolumeImage>
                  <S.VolumeSvg alt="volume">
                    <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
                  </S.VolumeSvg>
                </S.VolumeImage>
                <S.VolumeProgress>
                  <ProgresInputVolume ref={aRef} />
                </S.VolumeProgress>
              </S.VolumeContent>
            </S.BarVolumeBlock>
          </S.BarPlayerBlock>
        </S.BarContent>
      </S.Bar >
    </>
  );
};

export default AudioPlayer;