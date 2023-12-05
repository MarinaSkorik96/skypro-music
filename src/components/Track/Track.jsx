import React, { useEffect } from "react";
import * as S from "./TrackStyles"
import TrackSkeleton from "../TrackSkeleton/TrackSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { getAllTracks, getCurrentTrack } from "../../store/slices/track";
import { getIsPlaing, getCurrentPlayList } from "../../store/slices/track";
import { useGetAllTracksQuery, useSetDisLikeMutation, useSetLikeMutation } from "../../query/tracks";

const Track = ({ isLoadingM }) => {
  const dispatch = useDispatch();
  const { data, isError, isLoading } = useGetAllTracksQuery()
  useEffect(() => {
    if (data) {
      dispatch(getAllTracks(data))
    }
  }, [{ isLoading }])

  const curTrack = useSelector(state => state.track.currentTrack)
  const isPlaing = useSelector(state => state.track.isPlaying)
  const allTracks = useSelector(state => state.track.allTracks)
  const favTr = useSelector(state => state.track.favoriteTracks)
  const currentPage = useSelector(state => state.track.currentPage)
  const categoryTracks = useSelector(state => state.track.categoryTracks)
  const filretsActive = useSelector(state => state.track.filretsActive)
  const filteredTracks = useSelector(state => state.track.filteredTracks)
  console.log(filteredTracks)

  const [setLike] = useSetLikeMutation()
  const [setDisLike] = useSetDisLikeMutation()

  const arreyAllTracks = currentPage === 'favorites' && favTr ?
    favTr : currentPage === 'category' && categoryTracks ?
      categoryTracks : filretsActive ?
        filteredTracks : allTracks


  const currentAudioPlayerPlaylist = () => {
    if (currentPage === 'favorites') {
      dispatch(getCurrentPlayList(favTr))
    } else if (currentPage === 'main') {
      if (filretsActive) {
        dispatch(getCurrentPlayList(filteredTracks))
      } else {
        dispatch(getCurrentPlayList(allTracks))
      }
    } else if (currentPage === 'category') {
      dispatch(getCurrentPlayList(categoryTracks))
    }
  }

  function sToStr(s) {
    let m = Math.trunc(s / 60) + ''
    s = (s % 60) + ''
    return m.padStart(2, 0) + ':' + s.padStart(2, 0)
  }

  const activeLike = ({ track }) => {
    if (currentPage === 'main' || currentPage === 'category') {
      const ollUsersLikes = track.stared_user
      const userId = localStorage.getItem('id'); //Надо преобразовать в число
      const like = ollUsersLikes.find(user => user.id == userId)
      if (like) {
        return (true)
      }
      return (false)
    }
  }

  return (
    <>
      {isLoading ? <TrackSkeleton /> : null}
      {isError ? <p>Не удалось загрузить плейлист, попробуйте позже</p> : null}
      {isLoading || isLoadingM ? null : arreyAllTracks.map((track) => {
        return (
          <S.PlaylistItem key={track.id}>
            <S.PlaylistTrack>
              <S.TrackTitle onClick={() => {
                dispatch(getCurrentTrack(track));
                dispatch(getIsPlaing(true));
                currentAudioPlayerPlaylist()
              }}>
                <S.TrackTitleImage>
                  {isPlaing && curTrack.id === track.id && <S.BlinkingDot></S.BlinkingDot>}
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