import React from "react";
import * as S from "./PlayListStyles"
import LoadingContext from '../context';
import { useContext } from 'react';


export const playLists = [
  {
    id: 1,
    name: "day's playlist",
    src: "img/playlist01.png",
  },
  {
    id: 2,
    name: "100 dance hits",
    src: "img/playlist02.png",
  },
  {
    id: 3,
    name: "indie music",
    src: "img/playlist03.png",
  }
]

 const PlayList = () => {
  const { loading, setLoading } = useContext(LoadingContext)

  return (
    <>
      {playLists.map((playLista) => (
        loading ?
          <S.SidebarItemSkeleton></S.SidebarItemSkeleton>
          :
          <S.SidebarItem key={playLista.id}>
            <S.SidebarLink to={`/category/${playLista.id}`}>
              <S.SidebarImg
                src={playLista.src}
                alt={playLista.name}
              />
            </S.SidebarLink>
          </S.SidebarItem>
      ))}
    </>
  );
};

export default PlayList;