import Footer from "../Footer/Footer";
import HeaderAlt from "../HeaderAlt/HeaderAlt";
import HeaderBurg from "../HeaderBurg/HeaderBurg";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({handleBurgerMenuClick}) {
  return (
    <div>
      <HeaderAlt />
      <HeaderBurg handleBurgerMenuClick={handleBurgerMenuClick} />
      <SearchForm />
      <MoviesCardList>
        <MoviesCard buttonClass = "movies-card__button_del" buttonText=""/>
        <MoviesCard buttonClass = "movies-card__button_del" buttonText=""/>
        <MoviesCard buttonClass = "movies-card__button_del" buttonText=""/>
      </MoviesCardList>
      <div style={{minHeight: '140px'}}></div>
      <Footer />
    </div>
  )
};

export default SavedMovies;