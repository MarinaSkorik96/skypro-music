import React from "react";
import * as S from "./TrackStyles"
import { getTodos } from "../../../../api";
import { useEffect, useState } from "react";
import TrackSkeleton from "../TrackSkeleton/TrackSkeleton";



const Track = () => {

  const [tracks, setTracks] = useState([]);
  const [loadings, setLoadings] = useState(true)
  const [addTracksError, setAddTracksError] = useState(null)


  useEffect(() => {
    getTodos().then((tracks) => {
      setTracks(tracks);
    }).catch(() => {
      setAddTracksError(true);
    }).finally(() => {
      setLoadings(false);
    })
  }, [])

  function sToStr(s) {
    let m = Math.trunc(s / 60) + ''
    s = (s % 60) + ''
    return m.padStart(2, 0) + ':' + s.padStart(2, 0)
  }

  return (
    <>
      {loadings ? <TrackSkeleton /> : null}
      {addTracksError ? <p>Не удалось загрузить плейлист, попробуйте позже</p> : null}
      {tracks.map((track) => {
        return (
          <S.PlaylistItem key={track.id}>
            <S.PlaylistTrack>
              <S.TrackTitle>
                <S.TrackTitleImage>
                  <S.TrackTitleSvg alt="music">
                    <use xlinkHref="img/icon/sprite.svg#icon-note" />
                  </S.TrackTitleSvg>
                </S.TrackTitleImage>
                <div>
                  <S.TrackTitleLink href="http://">
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