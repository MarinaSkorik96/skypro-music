import React from "react";
import PlayList from "../PlayList/PlayList";
import { useContext } from 'react';
import LoadingContext from '../context';
import * as S from '../PlayList/PlayListStyles'


const PlayLists = () => {

  const { loading, setLoading } = useContext(LoadingContext)

  return (
    <S.SidebarList>
      {loading ?
        <div className="sidebar__item-skeleton"></div>
        :
        <PlayList />}
      {loading ?
        <div className="sidebar__item-skeleton"></div>
        :
        <S.SidebarItem>
          <S.SidebarLink href="#">
            <S.SidebarImg
              src="img/playlist02.png"
              alt="day's playlist"
            />
          </S.SidebarLink>
        </S.SidebarItem>
      }
      {loading ?
        <div className="sidebar__item-skeleton"></div>
        :
        <S.SidebarItem>
          <S.SidebarLink href="#">
            <S.SidebarImg
              src="img/playlist03.png"
              alt="day's playlist"
            />
          </S.SidebarLink>
        </S.SidebarItem>
      }
    </S.SidebarList>
  );
};

export default PlayLists;
