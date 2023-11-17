import * as S from "./mainStyles"
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer.jsx";
import NavMenu from "../../components/NavMenu/NavMenu.jsx";
import TrackList from "../../components/TrackList/TrackList.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import { useSelector } from "react-redux";



export function Main() {

  const currentTrackS = useSelector(state => state.track.currentTrack)

  return (

    <div>
      <S.Wrapper>
        <S.Container>
          <S.Main className="main">
            <NavMenu />
            <TrackList />
            <SideBar />
          </S.Main>
          {currentTrackS ? <AudioPlayer /> : null}
          <footer className="footer" />
        </S.Container>
      </S.Wrapper>
    </div>
  );
}

