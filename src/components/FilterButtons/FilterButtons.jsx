import React from "react";
import * as S from "./FilterButtonsStyles"
import { useDispatch, useSelector } from "react-redux";


const { useState } = React;


const FilterButtons = () => {
  const authors = useSelector(state => state.track.authors)
  const genres = useSelector(state => state.track.genres)

  // console.log(authors)
  // console.log(genres)


  // const getAuthors = () => {
  //   const allAuthors = [];
  //   for (let track of allTracks) {
  //     allAuthors.push(track.author)
  //   }
  //   console.log(allAuthors)
  //   const authorss = [...new Set(allAuthors)]
  //   console.log(authorss)
  // }
  // getAuthors()

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
    if (filtr === "newF") {
      console.log('new')
      setDefaultSort(false);
      setNewFerst(true);
      setOldFerst(false)
      setSortTitle("Сначала новые")

    } else if (filtr === "oldF") {
      console.log('old')
      setDefaultSort(false);
      setNewFerst(false);
      setOldFerst(true)
      setSortTitle("Сначала старые")

    } else if (filtr === "defaultS") {
      setDefaultSort(true);
      setNewFerst(false);
      setOldFerst(false)
      setSortTitle("По умолчанию")
    }
  }

  // const filterNameArr = [];


  const filterName = (filter, name, tipe ) => {
    console.log(filter)
    console.log(name)
    console.log(tipe)


    if (filter.includes(name)) {
      if(tipe === "автор") {
        setFilterNameArr(filter.filter((filter) => filter !== name))
      } else if (tipe === "жанр"){
        setFilterGenreArr(filter.filter((filter) => filter !== name))
      }
    } else {
      if(tipe === "автор") {
        setFilterNameArr([...filter, name])
      } else if (tipe === "жанр"){
        setFilterGenreArr([...filter, name])
      }

      // setFilterNameArr([...filter, name])
    }
  }
  console.log(filterNameArr)
  console.log(filterGenreArr)


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