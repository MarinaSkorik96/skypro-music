import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  allTracks: [],
  currentTrack: null,
  indexCurrentTrack: null,
  isPlaying: false,
  shuffle: false,
  shuffleAllTracks: [],
  favoriteTracks: [],
  categoryTracks: [],
  currentPlayList: [],
  currentPage: "",
  authors: [],
  genres: [],
  filteredTracks: [],
  filretsActive: false,
};

const getCurrentTrackSlace = createSlice({
  name: 'track',
  initialState,
  reducers: {

    getAllTracks(state, action) {
      state.allTracks = action.payload;
      const allTracks = new Array(...state.allTracks);
      const allAuthors = [];
      const denres = [];
      if (allTracks) {
        for (let track of allTracks) {
          allAuthors.push(track.author)
          denres.push(track.genre)
        }
        state.authors = [...new Set(allAuthors)].sort()
        state.genres = [...new Set(denres)].sort()
      }
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
    },

    getCategoryTracks(state, action) {
      state.categoryTracks = action.payload;
    },

    getFilters(state, action) {
      console.log(state.allTracks);
      state.filteredTracks = action.payload
      state.filretsActive = true;
    },

    getAddFiltersAuthore(state, action) {

      console.log(state.filteredTracks)
      console.log(action.payload)
      console.log(1)
      state.filteredTracks = [...state.filteredTracks, action.payload].sort((function (a, b) {
        return a.id - b.id
      }))
      state.filretsActive = true;

      // state.filteredTracks.map((track) => {
      // if (state.filteredTracks === action.payload) {
      //   console.log(0)
      //   const newTracks = [];
      //   newTracks.push(action.payload)
      //   state.filteredTracks = newTracks
      // } else {
      //   console.log(state.filteredTracks)
      //   console.log(action.payload)
      //   console.log(1)
      //   state.filteredTracks = [...state.filteredTracks, action.payload].sort((function (a, b) {
      //     return a.id - b.id
      //   }))
      //   state.filretsActive = true;
      // }
      // })


      // console.log(action.payload)
      // if (state.filteredTracks.includes(action.payload)) {
      //   console.log(333)
      //   const newTracks = [];
      //   state.filteredTracks.map((track) => {
      //     if (track !== action.payload) {
      //       newTracks.push(track)
      //     }
      //   })
      //   state.filteredTracks = newTracks
      // } else {
      //   state.filteredTracks = [...state.filteredTracks, action.payload].sort((function (a, b) {
      //     return a.id - b.id
      //   }))
      //   state.filretsActive = true;
      // }
    },
    getFiltersOff(state, action) {
      state.filretsActive = false;
      console.log('Фильтры пустые')

    },
    getDaleteFiltersAuthore(state, action) {
      // let newArr = [];

      // newArr = state.filteredTracks.filter((track) => track !== action.payload)
      // console.log(newArr)
      state.filteredTracks = action.payload
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
  getCurrentPage,
  getCategoryTracks,
  getFilters,
  getAddFiltersAuthore,
  getFiltersOff,
  getDaleteFiltersAuthore
} = getCurrentTrackSlace.actions;

export default getCurrentTrackSlace.reducer;