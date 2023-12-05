import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
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
  authorsFilterArr: [],
  genriesFilterArr: [],
  search: "",
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
    
    getFilterAuthorArr(state, action) {
      const { filterNameArr, filterGenreArr, sortTitle, searchInput } = action.payload

      // console.log(search)
      if (filterNameArr && filterGenreArr) {
        state.authorsFilterArr = filterNameArr
        state.genriesFilterArr = filterGenreArr
      }
      if (searchInput) {
        state.search = searchInput;

      }
      // console.log((JSON.stringify(state.authorsFilterArr)))
      // console.log((JSON.stringify(state.genriesFilterArr)))

      let filteredTracks = state.allTracks

      if (state.authorsFilterArr || state.genriesFilterArr) {
        if (state.genriesFilterArr.length > 0) {
          state.filretsActive = true;
          filteredTracks = filteredTracks.filter((track) =>
            state.genriesFilterArr.includes(track.genre)
          );
        }
        if (state.authorsFilterArr.length > 0) {
          state.filterAuthor = true;
          state.filretsActive = true;

          filteredTracks = filteredTracks.filter((track) =>
            state.authorsFilterArr.includes(track.author)
          );

        }
      }

      if (state.search) {
        state.filretsActive = true;
        console.log(searchInput)
        // console.log(current(filteredTracks))
        filteredTracks = filteredTracks.filter((track) =>
          track.name.toLocaleLowerCase().includes(state.search.toLocaleLowerCase())
        )

      }

      if (sortTitle === 'Сначала новые') {
        state.filretsActive = true;

        filteredTracks = filteredTracks.sort(function (a, b) {
          return new Date(b.release_date) - new Date(a.release_date)
        })
      } else if (sortTitle === 'Сначала старые') {
        filteredTracks = filteredTracks.sort(function (a, b) {
          return new Date(a.release_date) - new Date(b.release_date)
        })
        state.filretsActive = true;
      }

      state.filteredTracks = filteredTracks
    },

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
  getFilterAuthorArr,
} = getCurrentTrackSlace.actions;

export default getCurrentTrackSlace.reducer;