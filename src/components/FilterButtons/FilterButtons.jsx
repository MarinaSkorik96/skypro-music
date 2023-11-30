import React, { useEffect } from "react";
import * as S from "./FilterButtonsStyles"
import { useDispatch, useSelector } from "react-redux";
import { getFilters } from "../../store/slices/track";

const { useState } = React;


const FilterButtons = () => {
  const dispatch = useDispatch();
  const authors = useSelector(state => state.track.authors)
  const genres = useSelector(state => state.track.genres)
  const allTracks = useSelector(state => state.track.allTracks)
  // console.log(allTracks)
  const [visibleAuthor, setVisibleAuthor] = useState(false)
  const [visibleYear, setVisibleYear] = useState(false)
  const [visibleGenre, setVisibleGenre] = useState(false)
  const [defaultSort, setDefaultSort] = useState(true)
  const [newFerst, setNewFerst] = useState(false)
  const [oldFerst, setOldFerst] = useState(false)
  const [sortTitle, setSortTitle] = useState("По умолчанию")
  const [filterNameArr, setFilterNameArr] = useState([])
  const [filterGenreArr, setFilterGenreArr] = useState([])

  const toggleVisibilityAuthor = () => {
    setVisibleAuthor(!visibleAuthor)
    setVisibleGenre(false)
    setVisibleYear(false)
  }
  const toggleVisibilityYear = () => {
    setVisibleAuthor(false)
    setVisibleGenre(false)
    setVisibleYear(!visibleYear)
  }
  const toggleVisibilityGenre = () => {
    setVisibleAuthor(false)
    setVisibleGenre(!visibleGenre)
    setVisibleYear(false)
  }

  const sortTime = (filtr) => {
    if (filtr === "defaultS") {
      setDefaultSort(true);
      setNewFerst(false);
      setOldFerst(false)
      setSortTitle("По умолчанию")
      dispatch(getFilters(allTracks))
    } else {
      const tracksWithDate = [];
      const tracksWithoutDate = [];
      let sortedByDate = [];
      allTracks.map((track) => {
        if (track.release_date) {
          tracksWithDate.push(track)
        } else (
          tracksWithoutDate.push(track)
        )
      })
      if (filtr === "newF") {
        setDefaultSort(false);
        setNewFerst(true);
        setOldFerst(false)
        setSortTitle("Сначала новые")
        sortedByDate = tracksWithDate.sort(function (a, b) {
          return new Date(b.release_date) - new Date(a.release_date)
        })

      } else if (filtr === "oldF") {
        setDefaultSort(false);
        setNewFerst(false);
        setOldFerst(true)
        setSortTitle("Сначала старые")
        sortedByDate = tracksWithDate.sort(function (a, b) {
          return new Date(a.release_date) - new Date(b.release_date)
        })

      } else if (filtr === "defaultS") {
        setDefaultSort(true);
        setNewFerst(false);
        setOldFerst(false)
        setSortTitle("По умолчанию")
      }
      const ollTracksSortedByDate = [...sortedByDate, ...tracksWithoutDate]
      dispatch(getFilters(ollTracksSortedByDate))
    }
  }

  // console.log(allTracks)

  const filterName = (filter, name, tipe) => {
    if (filter.includes(name)) {
      if (tipe === "автор") {
        setFilterNameArr(filter.filter((filter) => filter !== name))
      } else if (tipe === "жанр") {
        setFilterGenreArr(filter.filter((filter) => filter !== name))
      }
    } else {
      if (tipe === "автор") {
        setFilterNameArr([...filter, name])
      } else if (tipe === "жанр") {
        setFilterGenreArr([...filter, name])
      }
    }
    // dispatch(getFilters({filterNameArr, filterGenreArr, sortTitle}))
    // console.log(filterNameArr);
    // console.log(filterGenreArr);
    // console.log(sortTitle);

  }

  useEffect(() => {

    // dispatch(getFilters({ filterNameArr, filterGenreArr, sortTitle }))
  }, [filterNameArr, filterGenreArr, sortTitle])


  return (
    <>
      <S.FilterDiv>
        <S.FilterTitle>Искать по:</S.FilterTitle>
        <S.FilterButtonBox  >
          <S.FilterButtonAuthor $props={visibleAuthor} onClick={toggleVisibilityAuthor}>
            исполнителю
          </S.FilterButtonAuthor>
          {filterNameArr.length !== 0 ? <S.CounterAuthor>{`${filterNameArr.length}`}</S.CounterAuthor> : null}

          {visibleAuthor &&
            (<S.FilterBox>
              <S.FilterList>
                {authors.map((author) => {
                  if (filterNameArr.includes(author)) {
                    return (
                      // {filterNameArrL.includes((author)=> {} )}
                      <S.FilterItem onClick={() => { filterName(filterNameArr, author, "автор") }} $props={true} >{author}</S.FilterItem>
                    )
                  } else {
                    return (
                      <S.FilterItem onClick={() => { filterName(filterNameArr, author, "автор") }} $props={false} >{author}</S.FilterItem>
                    )
                  }
                })
                }
              </S.FilterList>
            </S.FilterBox>)}
        </S.FilterButtonBox>

        <S.FilterButtonBox >
          <S.FilterButton onClick={toggleVisibilityGenre} $props={visibleGenre} >
            жанру
          </S.FilterButton>
          {filterGenreArr.length !== 0 ? <S.CounterGenre>{`${filterGenreArr.length}`}</S.CounterGenre> : null}

          {visibleGenre && (
            <S.FilterBox>
              <S.FilterListGenre>
                {genres.map((genre) => {
                  if (filterGenreArr.includes(genre)) {
                    return (
                      // {filterNameArrL.includes((author)=> {} )}
                      <S.FilterItem onClick={() => { filterName(filterGenreArr, genre, "жанр") }} $props={true} >{genre}</S.FilterItem>
                    )
                  } else {
                    return (
                      <S.FilterItem onClick={() => { filterName(filterGenreArr, genre, "жанр") }} $props={false} >{genre}</S.FilterItem>
                    )
                  }

                })
                }
              </S.FilterListGenre>
            </S.FilterBox>)}
        </S.FilterButtonBox>
      </S.FilterDiv>

      <S.FilterDiv>
        <S.FilterTitle>Сортировка:</S.FilterTitle>
        <S.FilterButtonBox>
          <S.FilterButtonTime $props={visibleYear} onClick={toggleVisibilityYear} >
            {sortTitle}
          </S.FilterButtonTime>
          {oldFerst || newFerst ? <S.Counter>1</S.Counter> : null}
          {visibleYear &&
            (<S.FilterBoxTime >
              <S.FilterListGenre >
                <S.FilterItem $props={defaultSort} onClick={() => { sortTime("defaultS") }}>По умолчанию</S.FilterItem>
                <S.FilterItem $props={oldFerst} onClick={() => { sortTime("oldF") }}>Сначала старые</S.FilterItem>
                <S.FilterItem $props={newFerst} onClick={() => { sortTime("newF") }}>Сначала новые</S.FilterItem>
              </S.FilterListGenre>
            </S.FilterBoxTime>)}
        </S.FilterButtonBox>
      </S.FilterDiv>

    </>
  );
};

export default FilterButtons