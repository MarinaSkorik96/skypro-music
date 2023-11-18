import React from "react";
import { useContext } from 'react';
import Context from '../../contexts';
import * as S from "./MyPlayListStyles"
import TracksBlock from "../../components/TracksBlock/TracksBlock";

export const MyPlaylist = () => {
  const { setIsMainPage } = useContext(Context)
  setIsMainPage(false)


  return (
    <div>
      <S.CenterblockH2>Мой плейлист</S.CenterblockH2>
      <TracksBlock />
    </div>
  );
};

