import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getSavedMovies } from "../../utils/MainApi";
import Footer from "../Footer/Footer";
import HeaderAlt from "../HeaderAlt/HeaderAlt";
import HeaderBurg from "../HeaderBurg/HeaderBurg";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ handleBurgerMenuClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const token = localStorage.getItem("token");
  const [savedMovies, setSavedMovies] = React.useState([]);

  React.useEffect(() => {
    getSavedMovies(token).then((res) => {
      console.log(res);
      setSavedMovies(res);
    });
  }, []);

  return (
    <div>
      <HeaderAlt />
      <HeaderBurg handleBurgerMenuClick={handleBurgerMenuClick} />
      <SearchForm />
      <MoviesCardList>
        {savedMovies.map((movie) => {
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
        {/* <MoviesCard buttonClass = "movies-card__button_del" buttonText=""/>
        <MoviesCard buttonClass = "movies-card__button_del" buttonText=""/>
        <MoviesCard buttonClass = "movies-card__button_del" buttonText=""/> */}
      </MoviesCardList>
      <div style={{ minHeight: "140px" }}></div>
      <Footer />
    </div>
  );
}

export default SavedMovies;
