import React from "react";
import PlayLists from "../PlayLists/PlayLists";
import * as S from "./SideBarStyles"
import { useContext } from 'react';
import Context from '../../../../context';


const SideBar = () => {

  const { getuser } = useContext(Context)
  console.log( getuser )

  const handleLogOut = () => {
    localStorage.removeItem('login')
  }

  return (
    <S.MainSidebar>
      <S.SidebarPersonal>
        <S.SidebarPersonalName>{getuser}</S.SidebarPersonalName>
        <S.SidebarIcon onClick={handleLogOut} to="/login">
          <svg alt="logout">
            <use xlinkHref="img/icon/sprite.svg#logout" />
          </svg>
        </S.SidebarIcon>
      </S.SidebarPersonal>
      <S.SidebarBlock>
        <PlayLists />
      </S.SidebarBlock>
    </S.MainSidebar>
  );
};

export default SideBar;
