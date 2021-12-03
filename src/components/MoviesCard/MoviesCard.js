import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { delMovie, saveMovie } from "../../utils/MainApi";
import "./MoviesCard.css";

function MoviesCard({
  title,
  duration,
  img,
  movie,
  savedMovies,
  isSaved,
  setSavedMovies,
  likedMoviesCheck,
  matchedMovies,
  localLikesCheck,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isCardSaved, setCardSaved] = React.useState(movie.isLiked);
  const token = localStorage.getItem("token");
  const buttonClass = isCardSaved
    ? `${
        isSaved
          ? "movies-card__button_saved_type_del"
          : "movies-card__button_saved"
      }`
    : "movies-card__button";
  const buttonText = isCardSaved ? "" : "Сохранить";

  React.useEffect(() => {
    setCardSaved(movie.isLiked);
    if (localLikesCheck) {
      localLikesCheck();
    }
  }, [movie.isLiked]);

  function handleButtonClick() {
    if (!isCardSaved) {
      handleSaveCard();
    } else {
      handleDelCard();
    }
  }

  function handleSaveCard() {
    saveMovie(movie, token, currentUser._id)
      .then((res) => {
        movie.isLiked = true;
        movie._id = res._id;
        res.isLiked = true;
        setSavedMovies([...savedMovies, res]);
        console.log(savedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDelCard() {
    delMovie(movie._id, token)
      .then((res) => {
        movie.isLiked = false;
        setSavedMovies(savedMovies.filter((item) => item._id !== movie._id));
        if (likedMoviesCheck) {
          console.log('работает')
          likedMoviesCheck(matchedMovies);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function durationText(duration) {
    const durationStr = duration + "";
    const durationArr = durationStr.split("");
    if (durationArr[durationArr.length - 1] === "1") {
      return `${duration} минута`;
    } else if (
      durationArr[durationArr.length - 1] === "2" ||
      durationArr[durationArr.length - 1] === "3" ||
      durationArr[durationArr.length - 1] === "4"
    ) {
      return `${duration} минуты`;
    } else if (
      durationArr[durationArr.length - 1] === "5" ||
      durationArr[durationArr.length - 1] === "6" ||
      durationArr[durationArr.length - 1] === "7" ||
      durationArr[durationArr.length - 1] === "8" ||
      durationArr[durationArr.length - 1] === "9" ||
      durationArr[durationArr.length - 1] === "0"
    ) {
      return `${duration} минут`;
    }
  }

  return (
    <div className="movies-card">
      <h2 className="movies-card__title">{title}</h2>
      <p className="movies-card__duration">{durationText(duration)}</p>
      <div className="movies-card__img-wrapper">
        <a
          className="movies-card__trailer-link"
          href={movie.trailerLink}
          target="blank"
        >
          <img
            className="movies-card__image"
            alt=""
            src={
              typeof img === "object"
                ? `https://api.nomoreparties.co${movie.image.url}`
                : img
            }
          />
        </a>
      </div>
      <button className={buttonClass} onClick={handleButtonClick}>
        {buttonText}
      </button>
    </div>
  );
}

export default MoviesCard;
