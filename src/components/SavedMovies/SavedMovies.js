import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getSavedMovies } from "../../utils/MainApi";
import Footer from "../Footer/Footer";
import HeaderAlt from "../HeaderAlt/HeaderAlt";
import HeaderBurg from "../HeaderBurg/HeaderBurg";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import NothingMatched from "../NothingMatched/NothingMatched";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  handleBurgerMenuClick,
  isCheckboxActive,
  handleCheckboxClick,
  movies,
  handleMoviesSearch,
  nothingMatchedSaved,
  savedMovies,
  setSavedMovies,
  noSavedMovies,
  handleCardSaveDelCheck
}) {
  if (!nothingMatchedSaved) {
    return (
      <div>
        <HeaderAlt />
        <HeaderBurg handleBurgerMenuClick={handleBurgerMenuClick} />
        <SearchForm
          handleCheckboxClick={handleCheckboxClick}
          handleMoviesSearch={handleMoviesSearch}
        />
        <MoviesCardList>
          {isCheckboxActive
            ? movies
                .filter((movie) => movie.duration <= 40)
                .map((movie) => {
                  return (
                    <MoviesCard
                      title={movie.nameRU}
                      duration={movie.duration}
                      img={movie.image}
                      movie={movie}
                      movies={movies}
                      movieId={movie._id}
                      isSaved={true}
                      savedMovies={savedMovies}
                      setSavedMovies={setSavedMovies}
                      handleCardSaveDelCheck={handleCardSaveDelCheck}
                    />
                  );
                })
            : movies.map((movie) => {
                return (
                  <MoviesCard
                    title={movie.nameRU}
                    duration={movie.duration}
                    img={movie.image}
                    movie={movie}
                    movieId={movie._id}
                    isSaved={true}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                    handleCardSaveDelCheck={handleCardSaveDelCheck}
                  />
                );
              })}
        </MoviesCardList>
        <div style={{ minHeight: "140px" }}></div>
        <Footer />
      </div>
    );
  } else if (noSavedMovies) {
    return (
      <div>
        <HeaderAlt />
        <HeaderBurg handleBurgerMenuClick={handleBurgerMenuClick} />
        <SearchForm
          handleCheckboxClick={handleCheckboxClick}
          handleMoviesSearch={handleMoviesSearch}
        />
        
        <div style={{ minHeight: "140px" }}></div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <HeaderAlt />
        <HeaderBurg handleBurgerMenuClick={handleBurgerMenuClick} />
        <SearchForm
          handleCheckboxClick={handleCheckboxClick}
          handleMoviesSearch={handleMoviesSearch}
        />
        <NothingMatched />
        <div style={{ minHeight: "140px" }}></div>
        <Footer />
      </div>
    );
  }
}

export default SavedMovies;
