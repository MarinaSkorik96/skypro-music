import React, { useEffect } from "react";
import * as S from "./SearchStyles.js"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilterAuthorArr } from "../../store/slices/track.js";


const Layout = () => {
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("")
  // useEffect(() => {
  //   console.log(searchInput)
  //   dispatch(getFilterAuthorArr({ search:searchInput }))

  // }, [searchInput])

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
          // setSearchInput(event.target.value);
          dispatch(getFilterAuthorArr({ searchInput: event.target.value }))

        }}
      />
    </S.CenterblockSearch>
  );
};

export default Layout;