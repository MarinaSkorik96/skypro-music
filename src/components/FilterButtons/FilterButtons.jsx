import React, { useEffect } from "react";
import * as S from "./FilterButtonsStyles"
import { useDispatch, useSelector } from "react-redux";
import {  getFilterAuthorArr } from "../../store/slices/track";

const { useState } = React;


const FilterButtons = () => {
  const dispatch = useDispatch();
  const authors = useSelector(state => state.track.authors)
  const genres = useSelector(state => state.track.genres)

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
    } else {
      if (filtr === "newF") {
        setDefaultSort(false);
        setNewFerst(true);
        setOldFerst(false)
        setSortTitle("Сначала новые")
      } else if (filtr === "oldF") {
        setDefaultSort(false);
        setNewFerst(false);
        setOldFerst(true)
        setSortTitle("Сначала старые")
      }
    }
  }

  const filterName = (filter, name, tipe) => {
    if (filter.includes(name)) {
      tipe(filter.filter((filter) => filter !== name))
    } else {
      tipe([...filter, name])
    }
  }

  useEffect(() => {
    dispatch(getFilterAuthorArr({ filterNameArr, filterGenreArr, sortTitle }))

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
                  return (
                    <S.FilterItem key={author} onClick={() => {
                      filterName(filterNameArr, author, setFilterNameArr)
                    }} $props={filterNameArr.includes(author)} >{author}</S.FilterItem>
                  )
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
                  return (
                    <S.FilterItem key={genre} onClick={() => {
                      filterName(filterGenreArr, genre, setFilterGenreArr)
                    }} $props={filterGenreArr.includes(genre)} >{genre}</S.FilterItem>
                  )
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