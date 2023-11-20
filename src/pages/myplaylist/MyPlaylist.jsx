import React, { useEffect } from "react";
import { useContext } from 'react';
import Context from '../../contexts';
import * as S from "./MyPlayListStyles"
import TracksBlock from "../../components/TracksBlock/TracksBlock";
import { useGetFavoritesTracksQuery } from "../../query/tracks";

export const MyPlaylist = () => {
  const { setIsMainPage } = useContext(Context)
  setIsMainPage(false)
  const { data = [] } = useGetFavoritesTracksQuery()
  console.log(data)
  console.log( useGetFavoritesTracksQuery())

  return (
    <div>
      <S.CenterblockH2>Мой плейлист</S.CenterblockH2>
      <TracksBlock />
    </div>
  );
};

