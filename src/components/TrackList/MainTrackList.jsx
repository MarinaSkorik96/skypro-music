import React from "react";
import TracksBlock from "../TracksBlock/TracksBlock";
import FilterButtons from "../FilterButtons/FilterButtons";
import * as S from "./TrackListStyles"


const MainTrackList = () => {
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