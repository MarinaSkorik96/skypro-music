import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTracks: [],
  currentTrack: null,
  indexCurrentTrack: null,
  isPlaying: false,
  shuffle: false,
  shuffleAllTracks: [],
};


const getCurrentTrackSlace = createSlice({
  name: 'track',
  initialState,
  reducers: {
    getAllTracks(state, action) {
      state.allTracks = action.payload;
    },
    getCurrentTrack(state, action) {
      state.currentTrack = action.payload;
      state.indexCurrentTrack = action.payload.id

    },
    getIsPlaing(state, action) {
      state.isPlaying = action.payload
    },
    nextTrack(state, action) {
      const { allTracs, currentTrackS } = action.payload
      if (allTracs.indexOf(currentTrackS) === allTracs.length - 1) {
        alert('Треки закончились')
        return
      }
      console.log(state.currentTrack)
      const indexOfNextTrack = allTracs.indexOf(currentTrackS) + 1;
      state.currentTrack = allTracs[indexOfNextTrack];
      state.indexCurrentTrack = currentTrackS.id +1;
      state.isPlaying = true
      console.log(currentTrackS)
      console.log(state.currentTrack)


    },
    prevTrack(state, action) {
      const { allTracs, currentTrackS } = action.payload
      if (allTracs.indexOf(currentTrackS) === 0) {
        alert('Это первый трек')
        return
      }
      const indexOfNextTrack = allTracs.indexOf(currentTrackS) - 1
      state.currentTrack = allTracs[indexOfNextTrack];
      state.indexCurrentTrack = action.payload.id
    },
    getShuffle(state, action) {
      let allTracks = action.payload.allTracs
      console.log(allTracks)
      allTracks.sort(() => Math.random() - 0.5)
      console.log(allTracks)
    }
  }
});


export const { getAllTracks, getCurrentTrack, getIsPlaing, nextTrack, prevTrack, getShuffle } = getCurrentTrackSlace.actions;

export default getCurrentTrackSlace.reducer;