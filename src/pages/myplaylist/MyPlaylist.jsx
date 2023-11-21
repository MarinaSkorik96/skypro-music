import React, { useEffect } from "react";
import { useContext } from 'react';
import Context from '../../contexts';
import * as S from "./MyPlayListStyles"
import TracksBlock from "../../components/TracksBlock/TracksBlock";
import { getFreshToken } from "../../store/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { useGetFavoritesTracksQuery } from "../../query/tracks";


export const MyPlaylist = () => {
  // const [getFavoritesTracks] = useGetFavoritesTracksQuery();
  const [getFavoritesTracks] = useGetFavoritesTracksQuery();
  const { setIsMainPage } = useContext(Context)
  setIsMainPage(false);

  // console.log([useGetFavoritesTracksQuery] )
  console.log(getFavoritesTracks)
  const dispatch = useDispatch();
  const tokenR = localStorage.getItem('token');
  // const access = useSelector(state =>  state.user.access);
  dispatch(getFreshToken(tokenR))

  return (
    <div>
      <S.CenterblockH2>Мой плейлист</S.CenterblockH2>
      <TracksBlock />
    </div>
  );
};

