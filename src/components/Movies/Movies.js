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
  handleCheckboxClick,
  isCheckboxActive,
  savedMovies,
  setSavedMovies,
  setLoaderActive,
  localLikesCheck
}) {
  const [iter, setIter] = React.useState(3);
  const [isMoreButtonActive, setMoreButtonActive] = React.useState(
    movies.length > 3 ? true : false
  );

  React.useEffect(() => {
    setMoreButtonActive(movies.length > 3 ? true : false);
    setIter(3);
  }, [movies]);

  React.useEffect(() => {
    setMoreButtonActive(iter < movies.length ? true : false);
  }, [iter]);

  function handleMoreButtonClick() {
    setIter(iter + 3);
  }

  if (nothingMatched) {
    return (
      <div>
        <HeaderAlt />
        <HeaderBurg handleBurgerMenuClick={handleBurgerMenuClick} />
        <SearchForm
          handleMoviesSearch={handleMoviesSearch}
          handleCheckboxClick={handleCheckboxClick}
          setLoaderActive={setLoaderActive}
        />
        {isLoaderActive ? <Preloader /> : <NothingMatched />}
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
          setLoaderActive={setLoaderActive}
        />
        {isLoaderActive ? (
          <Preloader />
        ) : (
          <MoviesCardList>
            {movies.map((movie) => {
              for (let i = 0; i < iter; i++) {
                if (movie.nameRU === movies[i].nameRU) {
                  return (
                    <MoviesCard
                      title={movie.nameRU}
                      duration={movie.duration}
                      img={`https://api.nomoreparties.co${movie.image.url}`}
                      movie={movie}
                      savedMovies={savedMovies}
                      setSavedMovies={setSavedMovies}
                      localLikesCheck={localLikesCheck}
                    />
                  );
                }
              }
            })}
          </MoviesCardList>
        )}
        {isMoreButtonActive && !isLoaderActive ? (
          <MoreButton handleMoreButtonClick={handleMoreButtonClick} />
        ) : (
          <div></div>
        )}
        <Footer />
      </div>
    );

    // if (nothingMatched) {
    //   return (
    //     <div>
    //       <HeaderAlt />
    //       <HeaderBurg handleBurgerMenuClick={handleBurgerMenuClick} />
    //       <SearchForm
    //         handleMoviesSearch={handleMoviesSearch}
    //         handleCheckboxClick={handleCheckboxClick}
    //       />
    //       <NothingMatched />
    //       <Footer />
    //     </div>
    //   );
    // } else if (isCheckboxActive) {
    //   return (
    //     <div>
    //       <HeaderAlt />
    //       <HeaderBurg handleBurgerMenuClick={handleBurgerMenuClick} />
    //       <SearchForm
    //         handleMoviesSearch={handleMoviesSearch}
    //         handleCheckboxClick={handleCheckboxClick}
    //       />
    //       {isLoaderActive ? (
    //         <Preloader />
    //       ) : (
    //         <MoviesCardList>
    //           {movies
    //             .filter((movie) => movie.duration <= 40)
    //             .map((movie) => {
    //               return (
    //                 <MoviesCard
    //                   title={movie.nameRU}
    //                   duration={movie.duration}
    //                   img={`https://api.nomoreparties.co${movie.image.url}`}
    //                   movie={movie}
    //                   savedMovies={savedMovies}
    //                   setSavedMovies={setSavedMovies}
    //                 />
    //               );
    //             })}
    //         </MoviesCardList>
    //       )}
    //       {isMoreButtonActive ? (
    //         <MoreButton handleMoreButtonClick={handleMoreButtonClick} />
    //       ) : (
    //         <div></div>
    //       )}
    //       <Footer />
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div>
    //       <HeaderAlt />
    //       <HeaderBurg handleBurgerMenuClick={handleBurgerMenuClick} />
    //       <SearchForm
    //         handleMoviesSearch={handleMoviesSearch}
    //         handleCheckboxClick={handleCheckboxClick}
    //       />
    //       {isLoaderActive ? (
    //         <Preloader />
    //       ) : (
    //         <MoviesCardList>
    //           {movies.map((movie) => {
    //             return (
    //               <MoviesCard
    //                 title={movie.nameRU}
    //                 duration={movie.duration}
    //                 img={`https://api.nomoreparties.co${movie.image.url}`}
    //                 movie={movie}
    //                 savedMovies={savedMovies}
    //                 setSavedMovies={setSavedMovies}
    //               />
    //             );
    //           })}
    //         </MoviesCardList>
    //       )}
    //       {isMoreButtonActive ? (
    //         <MoreButton handleMoreButtonClick={handleMoreButtonClick} />
    //       ) : (
    //         <div></div>
    //       )}
    //       <Footer />
    //     </div>
    //   );
    // }
  }
}

export default Movies;
