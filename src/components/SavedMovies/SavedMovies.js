import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getSavedMovies } from "../../utils/MainApi";
import Footer from "../Footer/Footer";
import HeaderAlt from "../HeaderAlt/HeaderAlt";
import HeaderBurg from "../HeaderBurg/HeaderBurg";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  handleBurgerMenuClick,
  isCheckboxActive,
  handleCheckboxClick,
  movies,
}) {
  return (
    <div>
      <HeaderAlt />
      <HeaderBurg handleBurgerMenuClick={handleBurgerMenuClick} />
      <SearchForm handleCheckboxClick={handleCheckboxClick} />
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
                    movieId={movie._id}
                    isSaved={true}
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
                />
              );
            })}
      </MoviesCardList>
      <div style={{ minHeight: "140px" }}></div>
      <Footer />
    </div>
  );
}

export default SavedMovies;
