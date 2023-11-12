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
  }
});


export const { getAllTracks, getCurrentTrack } = getCurrentTrackSlace.actions;

export default getCurrentTrackSlace.reducer;