import React from "react";
import * as S from "./PlayListStyles"
import { playLists } from "../../PlayListsArr.js"


const PlayList = () => {

  return (
    <>
      {playLists.map((playLista) => (
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