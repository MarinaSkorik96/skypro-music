import React, { useEffect } from "react";
import * as S from "./TrackStyles"
import TrackSkeleton from "../TrackSkeleton/TrackSkeleton";
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTrack } from "../../store/slices/track";
import { getIsPlaing, getCurrentPlayList } from "../../store/slices/track";
import Context from "../../contexts";


const Track = ({ page }) => {
  const dispatch = useDispatch();

  const curTrack = useSelector(state => state.track.currentTrack)
  const isPlaing = useSelector(state => state.track.isPlaying)
  const allTracks = useSelector(state => state.track.allTracks)
  const favTr = useSelector(state => state.track.favoriteTracks)
  const currentPage = useSelector(state => state.track.currentPage)

  const [isLiked, setIsLiked] = useState(false)

  const { loadings, addTracksError } = useContext(Context)

  const arreyAllTracks = page === 'favorites' && favTr ? favTr : allTracks

  const currentAudioPlayerPlaylist = () => {
    if (currentPage === 'favorites') {
      dispatch(getCurrentPlayList(favTr))
    } else if (currentPage === 'main') {
      dispatch(getCurrentPlayList(allTracks))

    }
  }

  function sToStr(s) {
    let m = Math.trunc(s / 60) + ''
    s = (s % 60) + ''
    return m.padStart(2, 0) + ':' + s.padStart(2, 0)
  }

  const addToFavorites = ({ id }) => {
    if (isLiked) {
      setIsLiked(false)
      console.log(isLiked)
    } else (
      setIsLiked(true)
      // console.log(isLiked)
    )
  }
  console.log(arreyAllTracks)

  return (
    <>
      {loadings ? <TrackSkeleton /> : null}
      {addTracksError ? <p>Не удалось загрузить плейлист, попробуйте позже</p> : null}
      {loadings ? null : arreyAllTracks.map((track) => {
        return (
          <S.PlaylistItem key={track.id}>
            <S.PlaylistTrack>
              <S.TrackTitle onClick={() => {
                dispatch(getCurrentTrack(track));
                dispatch(getIsPlaing(true));
                currentAudioPlayerPlaylist()
                console.log(arreyAllTracks)
              }}>
                <S.TrackTitleImage>
                  {isPlaing && curTrack.id === track.id && <S.BlinkingDot></S.BlinkingDot>}
                  {/* {isPlaing && track === curTrack && <S.BlinkingDot></S.BlinkingDot>} */}
                  <S.TrackTitleSvg alt="music">
                    <use xlinkHref="img/icon/sprite.svg#icon-note" />
                  </S.TrackTitleSvg>
                </S.TrackTitleImage>
                <div>
                  <S.TrackTitleLink href="#">
                    {track.name} <S.TrackTitleSpan />
                  </S.TrackTitleLink>
                </div>
              </S.TrackTitle>
              <S.TrackAuthor>
                <S.TrackAuthorLink href="http://">
                  {track.author}
                </S.TrackAuthorLink>
              </S.TrackAuthor>
              <S.TrackAlbum>
                <S.TrackAlbumLink href="http://">
                  {track.album}
                </S.TrackAlbumLink>
              </S.TrackAlbum>
              <div>
                <S.TrackTimeSvg alt="time">
                  <use xlinkHref="img/icon/sprite.svg#icon-like" />
                </S.TrackTimeSvg>
                <S.TrackTimeText>{sToStr(track.duration_in_seconds)}
                </S.TrackTimeText>
              </div>
            </S.PlaylistTrack>
          </S.PlaylistItem>
        )
      })}

    </>
  );
};

export default Track