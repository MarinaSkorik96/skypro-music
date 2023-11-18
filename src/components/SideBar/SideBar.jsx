import React from "react";
import PlayList from "../PlayList/PlayList";
import * as S from "./SideBarStyles"
import { useContext } from 'react';
import Context from '../../contexts';


const SideBar = () => {

  const { user, handleLogOut, isMainPage } = useContext(Context)

  return (
    <S.MainSidebar>
      <S.SidebarPersonal>
        <S.SidebarPersonalName>{user}</S.SidebarPersonalName>
        <S.SidebarIcon onClick={handleLogOut} to="./login">
          <svg alt="logout">
            <use xlinkHref="img/icon/sprite.svg#logout" />
          </svg>
        </S.SidebarIcon>
      </S.SidebarPersonal>
      <S.SidebarBlock  $display={isMainPage}>
        <PlayList />
      </S.SidebarBlock>
    </S.MainSidebar>
  );
};

export default SideBar;
