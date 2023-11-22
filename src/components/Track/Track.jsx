import React, { useEffect } from "react";
import * as S from "./TrackStyles"
import TrackSkeleton from "../TrackSkeleton/TrackSkeleton";
import { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTrack } from "../../store/slices/track";
import { getIsPlaing, getAllTracks } from "../../store/slices/track";
import Context from "../../contexts";


const Track = ({ page }) => {
  console.log(page)
  // console.log(playList)
  const dispatch = useDispatch();

  const curTrack = useSelector(state => state.track.currentTrack)
  const isPlaing = useSelector(state => state.track.isPlaying)
  const allTracks = useSelector(state => state.track.allTracks)
  const favTr = useSelector(state => state.track.favoriteTracks)

  const { loadings, addTracksError } = useContext(Context)
  console.log(favTr)
  console.log(allTracks)
  // const allTrackss =
  //  if (page === 'favorites') {
  //   allTrackss = [...favTr]
  // } else {
  //   allTrackss = [...allTracks]
  // }
  const arreyAllTracks = page === 'favorites' && favTr ? favTr : allTracks
  // const getNextTrack = () => {
  //   dispatch(getAllTracks({ favTr }));
  // }
  // if (page && favTr) {
  //   dispatch(getAllTracks({ favTr }));

  // }

  // page && favTr ? dispatch(getAllTracks(favTr)): null

  function sToStr(s) {
    let m = Math.trunc(s / 60) + ''
    s = (s % 60) + ''
    return m.padStart(2, 0) + ':' + s.padStart(2, 0)
  }

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
                // dispatch(getAllTracks(arreyAllTracks))
                console.log(arreyAllTracks)
              }}>
                <S.TrackTitleImage>
                  {isPlaing && track === curTrack && <S.BlinkingDot></S.BlinkingDot>}
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