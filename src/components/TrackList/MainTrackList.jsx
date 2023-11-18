import React from "react";
import TracksBlock from "../TracksBlock/TracksBlock";
import FilterButtons from "../FilterButtons/FilterButtons";
import * as S from "./MainTrackListStyles"
import { useContext } from 'react';
import Context from '../../contexts';


const MainTrackList = () => {
  const { setIsMainPage } = useContext(Context)
  setIsMainPage(true)


  return (
    <>
        <S.CenterblockH2>Треки</S.CenterblockH2>
        <S.CenterblockFilter>
          <S.FilterTitle>Искать по:</S.FilterTitle>
          <FilterButtons />
        </S.CenterblockFilter>
        <TracksBlock />
    </>
  );
};

export default MainTrackList