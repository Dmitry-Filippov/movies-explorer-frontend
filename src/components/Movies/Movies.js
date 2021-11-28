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
  handleMoreButtonClick,
  handleCheckboxClick,
  isCheckboxActive,
  savedMovies
}) {
  if (nothingMatched) {
    return (
      <div>
        <HeaderAlt />
        <HeaderBurg handleBurgerMenuClick={handleBurgerMenuClick} />
        <SearchForm
          handleMoviesSearch={handleMoviesSearch}
          handleCheckboxClick={handleCheckboxClick}
        />
        <NothingMatched />
        <Footer />
      </div>
    );
  } else if (isCheckboxActive) {
    return (
      <div>
        <HeaderAlt />
        <HeaderBurg handleBurgerMenuClick={handleBurgerMenuClick} />
        <SearchForm
          handleMoviesSearch={handleMoviesSearch}
          handleCheckboxClick={handleCheckboxClick}
        />
        {isLoaderActive ? (
          <Preloader />
        ) : (
          <MoviesCardList>
            {movies
              .filter((movie) => movie.duration <= 40)
              .map((movie) => {
                return (
                  <MoviesCard
                    title={movie.nameRU}
                    duration={movie.duration}
                    img={`https://api.nomoreparties.co${movie.image.url}`}
                    movie={movie}
                    savedMovies={savedMovies}
                  />
                );
              })}
          </MoviesCardList>
        )}
        {isMoreButtonActive ? (
          <MoreButton handleMoreButtonClick={handleMoreButtonClick} />
        ) : (
          <div></div>
        )}
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <HeaderAlt />
        <HeaderBurg handleBurgerMenuClick={handleBurgerMenuClick} />
        <SearchForm
          handleMoviesSearch={handleMoviesSearch}
          handleCheckboxClick={handleCheckboxClick}
        />
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
                  savedMovies={savedMovies}
                />
              );
            })}
          </MoviesCardList>
        )}
        {isMoreButtonActive ? (
          <MoreButton handleMoreButtonClick={handleMoreButtonClick} />
        ) : (
          <div></div>
        )}
        <Footer />
      </div>
    );
  }
}

export default Movies;
