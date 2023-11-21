import React, { useEffect } from "react";
import { useContext } from 'react';
import Context from '../../contexts';
import * as S from "./MyPlayListStyles"
import TracksBlock from "../../components/TracksBlock/TracksBlock";
import { useGetFavoritesTracksQuery } from "../../query/tracks";
import { getFreshToken } from "../../store/slices/user";
import { useDispatch, useSelector } from "react-redux";


export const MyPlaylist = () => {

  const { setIsMainPage } = useContext(Context)
  setIsMainPage(false)

  // const dispatch = useDispatch();
  // const tokenR = localStorage.getItem('token');

  // dispatch(getFreshToken(tokenR))

  const { data = [], error } = useGetFavoritesTracksQuery()
  console.log(data)

  return (
    <div>
      <S.CenterblockH2>Мой плейлист</S.CenterblockH2>
      <TracksBlock />
    </div>
  );
};

