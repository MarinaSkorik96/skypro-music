import { useEffect, useState } from 'react';
import './App.css';
import AudioPlayer from "./components/AudioPlayer";
import NavMenu from "./components/NavMenu";
import TrackList from "./components/TrackList";
import SideBar from "./components/SideBar";
import LoadingContext from './components/context';

function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <LoadingContext.Provider value={{loading, setLoading}}>
      <div>
        <div className="wrapper">
          <div className="container">
            <main className="main">
              <NavMenu />
              <TrackList />
              <SideBar />
            </main>
            <AudioPlayer />
            <footer className="footer" />
          </div>
        </div>
      </div>
    </LoadingContext.Provider>
  );
}

export default App;
