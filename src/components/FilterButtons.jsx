import React from "react";

const FilterButtons = () => {
  return (
    <>
      <div className="filter__button button-author _btn-text">
        исполнителю
        <div className="filter__box filter__box-author ">
          <ul className="filter__list">
            <li className="filter__item">Исполнитель 1</li>
            <li className="filter__item">Исполнитель 2</li>
            <li className="filter__item">Исполнитель 3</li>
            <li className="filter__item">Исполнитель 4</li>
            <li className="filter__item">Исполнитель 5</li>
            <li className="filter__item">Исполнитель 6</li>
            <li className="filter__item">Исполнитель 7</li>
            <li className="filter__item">Исполнитель 8</li>
          </ul>
        </div>
      </div>

      <div className="filter__button button-year _btn-text">
        году выпуска
        <div className="filter__box filter__box-year">
          <ul className="filter__list">
            <li className="filter__item">2016</li>
            <li className="filter__item">2017</li>
            <li className="filter__item">2018</li>
            <li className="filter__item">2019</li>
            <li className="filter__item">2020</li>
            <li className="filter__item">2021</li>
            <li className="filter__item">2022</li>
            <li className="filter__item">2023</li>
          </ul>
        </div>
      </div>

      <div className="filter__button button-genre _btn-text">
        жанру
        <div className="filter__box filter__box-genre">
        <ul className="filter__list">
          <li className="filter__item">Жанр 1</li>
          <li className="filter__item">Жанр 2</li>
          <li className="filter__item">Жанр 3</li>
          <li className="filter__item">Жанр 4</li>
          <li className="filter__item">Жанр 5</li>
          <li className="filter__item">Жанр 6</li>
          <li className="filter__item">Жанр 7</li>
          <li className="filter__item">Жанр 8</li>
        </ul>
      </div>

      </div>

    </>
  );
};

export default FilterButtons