import React from "react";
import PlayList from "../PlayList/PlayList";
import * as S from "./SideBarStyles"
import { useContext } from 'react';
import Context from '../../contexts';
import { getFreshToken } from "../../store/slices/user";
import { useDispatch, useSelector } from "react-redux";


const SideBar = () => {

  const dispatch = useDispatch();
  const refresh = useSelector(state => state.user.refresh)
  console.log(refresh)
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
      <S.SidebarBlock $display={isMainPage}>
        <PlayList />
        <button onClick={()=> {dispatch(getFreshToken(refresh))}}> Обнови токен</button>
      </S.SidebarBlock>
    </S.MainSidebar>
  );
};

export default SideBar;
