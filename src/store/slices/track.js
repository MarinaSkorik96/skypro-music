import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";



// export const getLikes = createAsyncThunk(
//   'user/getFreshToken',
//   async function (_, { rejectWithValue }) {
//     const access = useSelector(state => state.track.access)

//     // try {
//       const response = await fetch('https://skypro-music-api.skyeng.tech/catalog/track/16/favorite/', {
//         method: "POST",
//         body: JSON.stringify({
//           refresh: access,
//         }),
//         headers: {
//           "content-type": "application/json",
//         },
//     })
//       // if (!response.ok) {
//       //   if (response.status === 400) {
//       //     throw new Error(response.statusText);

//       //   }
//       //   throw new Error('Error server');
//       // }
//       const likes = await response.json();
//       return likes

//     // } catch (error) {
//     //   return rejectWithValue(error.message)
//     // }
//   }
// )

const initialState = {
  allTracks: [],
  currentTrack: null,
  indexCurrentTrack: null,
  isPlaying: false,
  shuffle: false,
  shuffleAllTracks: [],
  favoriteTracks: [],
  currentPlayList: [],
  currentPage: "",
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
      const { arreyAllTracks, currentTrack } = action.payload
      if (arreyAllTracks.indexOf(currentTrack) === arreyAllTracks.length - 1) {
        alert('Треки закончились')
        return
      }
      const indexOfNextTrack = arreyAllTracks.indexOf(currentTrack) + 1;
      state.currentTrack = arreyAllTracks[indexOfNextTrack];
      state.isPlaying = true
    },

    prevTrack(state, action) {
      const { arreyAllTracks, currentTrack } = action.payload
      if (arreyAllTracks.indexOf(currentTrack) === 0) {
        alert('Это первый трек')
        return
      }
      const indexOfNextTrack = arreyAllTracks.indexOf(currentTrack) - 1
      state.currentTrack = arreyAllTracks[indexOfNextTrack];
      state.indexCurrentTrack = action.payload.id
    },

    getShuffle(state, action) {
      state.shuffle = action.payload;
      const shuffleArray = new Array(...state.currentPlayList)
      shuffleArray.sort(() => Math.random() - 0.5)
      state.shuffleAllTracks = state.shuffle && shuffleArray
    },

    resetCurrentTrack(state, action) {
      state.currentTrack = action.payload;
    },
    getFavoriteTracks(state, action) {
      state.favoriteTracks = action.payload;
    },
    getCurrentPlayList(state, action) {
      state.currentPlayList = action.payload;
    },
    getCurrentPage(state, action) {
      state.currentPage = action.payload;
    }
  },
  // extraReducers: {
  //   [getLikes.fulfilled]: (state, action) => {
  //     console.log(action.payload)
  //   },
  //   [getLikes.rejected]: (state, action) => {
  //     console.log(action.payload)
  //   }
  // }
});


export const {
  getAllTracks,
  getCurrentTrack,
  getIsPlaing,
  nextTrack,
  prevTrack,
  getShuffle,
  resetCurrentTrack,
  getFavoriteTracks,
  getCurrentPlayList,
  getCurrentPage
} = getCurrentTrackSlace.actions;

export default getCurrentTrackSlace.reducer;