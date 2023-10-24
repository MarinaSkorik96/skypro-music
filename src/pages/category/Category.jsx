import React from "react";
import { useParams } from "react-router-dom";
// import * as S from "./PlayListStyles"
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

export const  Category = () => {
  const params = useParams();
  const playLista = playLists.find((playLista) => playLista.id === Number(params.id));
  return (
    <div>
      <h1>Подборкa {playLista.id}</h1>
    </div>
  );
};