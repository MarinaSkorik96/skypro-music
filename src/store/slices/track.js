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

  filteredTracks: [],
  filretsActive: false,
  filterSortDateTracks: [],
  filterSortDate: false,
  filterAuthorTracks: [],
  filterAuthor: false,
  filterGenreTracks: [],
  filterGenre: false,
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
      console.log(action.payload)
      const { filterNameArr, filterGenreArr, sts } = action.payload

      state.authorsFilterArr = filterNameArr
      state.genriesFilterArr = filterGenreArr

      let filteredTracks = state.allTracks


      if (state.authorsFilterArr || state.genriesFilterArr) {
        if (state.genriesFilterArr.length > 0) {
          state.filterGenre = true;
          state.filretsActive = true;

          filteredTracks = filteredTracks.filter((track) =>
            state.genriesFilterArr.includes(track.genre)
          );
          console.log(current(state.allTracks))
        }
        if (state.authorsFilterArr.length > 0) {
          state.filterAuthor = true;
          state.filretsActive = true;

          filteredTracks = filteredTracks.filter((track) =>
            state.authorsFilterArr.includes(track.author)
          );
        }
      }

      if (sts) {
        state.filretsActive = true;

        const tracksWithDate = [];
        const tracksWithoutDate = [];
        let sortedByDate = [];
        filteredTracks.map((track) => {
          if (track.release_date) {
            tracksWithDate.push(track)
          } else (
            tracksWithoutDate.push(track)
          )
        })
        if (sts === 'Сначала новые') {
          sortedByDate = tracksWithDate.sort(function (a, b) {
            return new Date(b.release_date) - new Date(a.release_date)
          })
        } else if (sts === 'Сначала старые') {
          sortedByDate = tracksWithDate.sort(function (a, b) {
            return new Date(a.release_date) - new Date(b.release_date)
          })
        } else {

        }
        filteredTracks = [...sortedByDate, ...tracksWithoutDate]

      }


      state.filteredTracks = filteredTracks

    },
    getFilterGenreArr(state, action) {
      state.authorsGenreArr = action.payload
      if (state.authorsGenreArr.length > 0) {
        state.filterGenre = true;
        state.filretsActive = true;

        state.filteredTracks = state.allTracks.filter((track) =>
          state.authorsGenreArr.includes(track.genre)
        );
      }

    },


    getSortDateFilter(state, action) {
      // state.filteredTracks = action.payload
      state.filteredTracks = action.payload

      state.filretsActive = true;
      state.filterSortDate = true;
    },
    getSortDateFilterOff(state, action) {
      // state.filteredTracks = action.payload
      state.filteredTracks = action.payload
      state.filretsActive = false;
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
  getFilters,
  getAddFiltersAuthore,
  getFiltersOff,
  getDaleteFiltersAuthore,
  getSortDateFilter,
  getSortDateFilterOff,
  getAddFiltersGenre,
  getDaleteFiltersGenre,
  getFilterAuthorArr,
  getFilterGenreArr
} = getCurrentTrackSlace.actions;

export default getCurrentTrackSlace.reducer;