import Footer from "../Footer/Footer";
import HeaderAlt from "../HeaderAlt/HeaderAlt";
import HeaderBurg from "../HeaderBurg/HeaderBurg";
import MoreButton from "../MoreButton/MoreButton";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies({handleBurgerMenuClick}) {
  return (
    <div>
      <HeaderAlt />
      <HeaderBurg handleBurgerMenuClick={handleBurgerMenuClick} />
      <SearchForm />
      <MoviesCardList>
        <MoviesCard buttonClass = "movies-card__button" buttonText="Сохранить"/>
        <MoviesCard buttonClass = "movies-card__button_saved" buttonText=""/>
        <MoviesCard buttonClass = "movies-card__button_saved" buttonText=""/>
        <MoviesCard buttonClass = "movies-card__button" buttonText="Сохранить"/>
      </MoviesCardList>
      <MoreButton />
      <Footer />
    </div>
  );
}

export default Movies;
