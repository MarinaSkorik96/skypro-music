import React from "react";
import * as S from "./SearchStyles.js"
import { useDispatch } from "react-redux";
import { getFilterAuthorArr } from "../../store/slices/track.js";


const Layout = () => {
  const dispatch = useDispatch();

  return (
    <S.CenterblockSearch>
      <S.SearchSvg>
        <use xlinkHref="img/icon/sprite.svg#icon-search" />
      </S.SearchSvg>
      <S.SearchText
        type="search"
        placeholder="Поиск"
        name="search"
        onChange={(event) => {
          dispatch(getFilterAuthorArr({ searchInput: event.target.value }))
        }}
      />
    </S.CenterblockSearch>
  );
};

export default Layout;