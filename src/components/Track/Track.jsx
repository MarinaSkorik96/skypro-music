import React, { useEffect } from "react";
import * as S from "./TrackStyles"
import TrackSkeleton from "../TrackSkeleton/TrackSkeleton";
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTrack } from "../../store/slices/track";
import { getIsPlaing, getCurrentPlayList } from "../../store/slices/track";
import Context from "../../contexts";
import { useSetLikeMutation } from "../../query/tracks";

const Track = ({ page }) => {
  const dispatch = useDispatch();

  const curTrack = useSelector(state => state.track.currentTrack)
  const isPlaing = useSelector(state => state.track.isPlaying)
  const allTracks = useSelector(state => state.track.allTracks)
  const favTr = useSelector(state => state.track.favoriteTracks)
  const currentPage = useSelector(state => state.track.currentPage)

  const [isLiked, setIsLiked] = useState(false)

  const { loadings, addTracksError } = useContext(Context)

  const [setLike] = useSetLikeMutation()
  // console.log(setLike)
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


  const activeLike = ({ track }) => {
    if (currentPage === 'main') {
      const ollUsersLikes = track.stared_user
      const userId = 2517
      // console.log(ollUsersLikes)
      const like = ollUsersLikes.find(user => user.id === userId)
      if (like) {
        console.log(true)
        return (true)
      }
      console.log(false)

      return (false)
      // console.log(isLiked)
      // if (track.stared_user) {

      // // }
      // let cities = [{ id: 121, name: 'г. Урюпинск' }, { id: 122, name: 'г. Париж' }, { id: 123, name: 'г. Москва' }, { id: 124, name: 'г. Штормград' }];
      // let searchTerm = 'г. Москва';
      // let cityId = cities.find(city => city.name === searchTerm).id
      // console.log(cityId);
    }
  }

  return (
    <>
      {loadings ? <TrackSkeleton /> : null}
      {addTracksError ? <p>Не удалось загрузить плейлист, попробуйте позже</p> : null}
      {loadings ? null : arreyAllTracks.map((track) => {
        // activeLike({ track })
        return (
          <S.PlaylistItem key={track.id}>
            <S.PlaylistTrack>
              <S.TrackTitle onClick={() => {
                dispatch(getCurrentTrack(track));
                dispatch(getIsPlaing(true));
                currentAudioPlayerPlaylist()
                console.log(track.stared_user)
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
              {
                  activeLike({ track }) ? 
                  <S.TrackTimeSvgLike 

                  // $fill={like} 
                  alt="time">
                    <use xlinkHref="img/icon/sprite.svg#icon-like" />
                  </S.TrackTimeSvgLike>
                  :
                  <S.TrackTimeSvg 

                  // $fill={like} 
                  alt="time">
                    <use xlinkHref="img/icon/sprite.svg#icon-like" />
                  </S.TrackTimeSvg>

  
                    // console.log("f")
                    // const like = true
                  
          
                }
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