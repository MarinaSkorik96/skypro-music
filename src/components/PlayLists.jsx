import React from "react";
import PlayList from "./PlayList";

const PlayLists = () => {

  
  return (
    <div className="sidebar__list">
      <PlayList />
      <div className="sidebar__item">
        <a className="sidebar__link" href="#">
          <img
            className="sidebar__img"
            src="img/playlist02.png"
            alt="day's playlist"
          />
        </a>
      </div>
      <div className="sidebar__item">
        <a className="sidebar__link" href="#">
          <img
            className="sidebar__img"
            src="img/playlist03.png"
            alt="day's playlist"
          />
        </a>
      </div>
    </div>
  );
};

export default PlayLists;
