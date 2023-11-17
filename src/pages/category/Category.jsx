import React from "react";
import { useParams } from "react-router-dom";
// import * as S from "./PlayListStyles"
import { playLists } from "../../PlayListsArr.js"
import { useDispatch, useSelector } from "react-redux";
import { NavMenu } from "../../components/BurgerMenu/BurgerMenuStyles.js";
import TrackList from "../../components/TrackList/MainTrackList.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import * as S from "../main/mainStyles.js"
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer.jsx";

export const Category = () => {
  const params = useParams();
  console.log(params)
  const playLista = playLists.find((playLista) => playLista.id === Number(params.id));


  return (
    <>
      <h1>Подборкa {playLista.id}</h1>
    </>
  );
};