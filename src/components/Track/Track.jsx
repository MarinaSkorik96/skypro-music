import React, { useEffect } from "react";
import * as S from "./TrackStyles"
import TrackSkeleton from "../TrackSkeleton/TrackSkeleton";
// import { useContext, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllTracks, getCurrentTrack } from "../../store/slices/track";
import { getIsPlaing, getCurrentPlayList } from "../../store/slices/track";
// import Context from "../../contexts";
import { useGetAllTracksQuery, useSetDisLikeMutation, useSetLikeMutation } from "../../query/tracks";

const Track = ({ isLoadingM }) => {
  const dispatch = useDispatch();
  const { data, isError, isLoading } = useGetAllTracksQuery()
  // console.log(useGetAllTracksQuery())
  // console.log(data)
  // console.log(isError)
  // console.log(isLoading)
  useEffect(() => {
    if (data) {
      // console.log(isLoading)
      // console.log(12)
      dispatch(getAllTracks(data))
    }

  }, [{ isLoading }])
  // dispatch(getAllTracks(data))


  const curTrack = useSelector(state => state.track.currentTrack)
  const isPlaing = useSelector(state => state.track.isPlaying)
  const allTracks = useSelector(state => state.track.allTracks)
  const favTr = useSelector(state => state.track.favoriteTracks)
  const currentPage = useSelector(state => state.track.currentPage)
  const categoryTracks = useSelector(state => state.track.categoryTracks)
  const filretsActive = useSelector(state => state.track.filretsActive)
  const filteredTracks = useSelector(state => state.track.filteredTracks)
  const authorsFilterArr = useSelector(state => state.track.authorsFilterArr)
  const genriesFilterArr = useSelector(state => state.track.genriesFilterArr)
  const filterAuthorTracks = useSelector(state => state.track.filterAuthorTracks)
  const filterGenreTracks = useSelector(state => state.track.filterGenreTracks)

  // console.log(filterAuthorTracks)
  console.log(filteredTracks)
  const arr = filterAuthorTracks.filter((x => filterGenreTracks.includes(x)))
  console.log(arr)
  useEffect(() => {

  }, [authorsFilterArr, genriesFilterArr])

  // console.log(filteredTracks)
  // console.log(categoryTracks)
  // console.log(allTracks)
  const [setLike] = useSetLikeMutation()
  const [setDisLike] = useSetDisLikeMutation()

  const arreyAllTracks = currentPage === 'favorites' && favTr ?
    favTr : currentPage === 'category' && categoryTracks ?
      categoryTracks : filretsActive ?
        // filteredTracks: filterSortDate ?
        // filteredTracks : filretsActive ?
        filteredTracks : allTracks

  // console.log(filteredTracks)
  // console.log(filterSortDate)
  // console.log(filterAuthor)

  const currentAudioPlayerPlaylist = () => {
    if (currentPage === 'favorites') {
      dispatch(getCurrentPlayList(favTr))
    } else if (currentPage === 'main') {
      dispatch(getCurrentPlayList(allTracks))
    } else if (currentPage === 'category') {
      dispatch(getCurrentPlayList(categoryTracks))
    }
  }

  function sToStr(s) {
    let m = Math.trunc(s / 60) + ''
    s = (s % 60) + ''
    return m.padStart(2, 0) + ':' + s.padStart(2, 0)
  }

  // console.log(arreyAllTracks)

  const activeLike = ({ track }) => {
    if (currentPage === 'main' || currentPage === 'category') {
      const ollUsersLikes = track.stared_user
      const userId = localStorage.getItem('id'); //Надо преобразовать в число
      const like = ollUsersLikes.find(user => user.id == userId)
      if (like) {
        // console.log(true)
        return (true)
      }
      // console.log(false)
      return (false)
    }
  }

  return (
    <>
      {isLoading ? <TrackSkeleton /> : null}
      {isError ? <p>Не удалось загрузить плейлист, попробуйте позже</p> : null}
      {/* {arreyAllTracks.lenпth===0 ? null : <p>В этом плейлисте нет треков</p>} */}
      {isLoading || isLoadingM ? null : arreyAllTracks.map((track) => {
        // activeLike({ track })
        return (
          <S.PlaylistItem key={track.id}>
            <S.PlaylistTrack>
              <S.TrackTitle onClick={() => {
                dispatch(getCurrentTrack(track));
                dispatch(getIsPlaing(true));
                currentAudioPlayerPlaylist()
                // console.log(track.stared_user)
              }}>
                <S.TrackTitleImage>
                  {isPlaing && curTrack.id === track.id && <S.BlinkingDot></S.BlinkingDot>}
                  {/* {isPlaing && track === curTrack && <S.BlinkingDot></S.BlinkingDot>} */}
                  <S.TrackTitleSvg alt="music">
                    <use xlinkHref="/img/icon/sprite.svg#icon-note" />
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
                  activeLike({ track }) || currentPage === 'favorites' ?
                    <S.TrackTimeSvgLike onClick={() => { setDisLike(track.id) }} alt="time">
                      <use xlinkHref="/img/icon/sprite.svg#icon-like" />
                    </S.TrackTimeSvgLike>
                    :
                    <S.TrackTimeSvg onClick={() => { setLike(track.id) }} alt="time">
                      <use xlinkHref="/img/icon/sprite.svg#icon-like" />
                    </S.TrackTimeSvg>
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