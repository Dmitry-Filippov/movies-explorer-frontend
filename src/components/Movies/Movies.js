import React from "react";
import Footer from "../Footer/Footer";
import HeaderAlt from "../HeaderAlt/HeaderAlt";
import HeaderBurg from "../HeaderBurg/HeaderBurg";
import MoreButton from "../MoreButton/MoreButton";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import NothingMatched from "../NothingMatched/NothingMatched";

function Movies({
  handleBurgerMenuClick,
  movies,
  handleMoviesSearch,
  isLoaderActive,
  nothingMatched,
  isMoreButtonActive,
  handleMoreButtonClick
}) {
  if (nothingMatched) {
    return (
      <div>
        <HeaderAlt />
        <HeaderBurg handleBurgerMenuClick={handleBurgerMenuClick} />
        <SearchForm handleMoviesSearch={handleMoviesSearch} />
        <NothingMatched />
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <HeaderAlt />
        <HeaderBurg handleBurgerMenuClick={handleBurgerMenuClick} />
        <SearchForm handleMoviesSearch={handleMoviesSearch} />
        {isLoaderActive ? (
          <Preloader />
        ) : (
          <MoviesCardList>
            {movies.map((movie) => {
              return (
                <MoviesCard
                  title={movie.nameRU}
                  duration={movie.duration}
                  img={`https://api.nomoreparties.co${movie.image.url}`}
                  movie={movie}
                />
              );
            })}
          </MoviesCardList>
        )}
        {isMoreButtonActive ? <MoreButton handleMoreButtonClick={handleMoreButtonClick}/> : <div></div>}
        <Footer />
      </div>
    );
  }
}

export default Movies;
