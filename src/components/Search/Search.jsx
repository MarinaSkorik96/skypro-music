import React, { useState } from "react";
import * as S from "./SearchStyles.js"
import { useDispatch, useSelector } from "react-redux";
import { getFilterAuthorArr } from "../../store/slices/track.js";


const Layout = () => {
  const [disableda, setDisableda] = useState(false)
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.track.currentPage)
  if (currentPage === 'favorites' || currentPage === 'category') {
    setDisableda(true)
  }
  return (
    <S.CenterblockSearch>
      <S.SearchSvg>
        <use xlinkHref="/img/icon/sprite.svg#icon-search" />
      </S.SearchSvg>
{}
      <S.SearchText
        type="search"
        placeholder="Поиск"
        name="search"
        
        disabled={disableda}
        onChange={(event) => {
          dispatch(getFilterAuthorArr({ searchInput: event.target.value }))
        }}
      />
    </S.CenterblockSearch>
  );
};

export default Layout;