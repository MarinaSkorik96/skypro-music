import React, { useEffect } from "react";
import { useContext } from 'react';
import Context from '../../contexts';
import * as S from "./MyPlayListStyles"
import TracksBlock from "../../components/TracksBlock/TracksBlock";
import { getFreshToken } from "../../store/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { useGetFavoritesTracksQuery } from "../../query/tracks";
import { getFavoriteTracks, getCurrentPage } from "../../store/slices/track";

export const MyPlaylist = () => {
  const dispatch = useDispatch();
  dispatch(getCurrentPage('favorites'))

  const { setIsMainPage } = useContext(Context)
  setIsMainPage(false);

  const { data, isLoading } = useGetFavoritesTracksQuery();
  console.log(isLoading)
  dispatch(getFavoriteTracks(data))

  return (
    <div>
      <S.CenterblockH2>Мой плейлист</S.CenterblockH2>
      <TracksBlock page={"favorites"} />
    </div>
  );
};

