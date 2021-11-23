import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { delMovie, saveMovie } from "../../utils/MainApi";
import "./MoviesCard.css";

function MoviesCard({ title, duration, img, movie, movieId, isSaved }) {
  const [isCardSaved, setCardSaved] = React.useState(isSaved);
  // const [movieId, setMovieId] = React.useState("");
  const token = localStorage.getItem("token");
  const currentUser = React.useContext(CurrentUserContext);
  const buttonClass = isCardSaved
    ? "movies-card__button_saved"
    : "movies-card__button";
  const buttonText = isCardSaved ? "" : "Сохранить";

  function handleButtonClick() {
    if (!isCardSaved) {
      handleSaveCard();
    } else {
      handleDelCard();
    }
  }

  function handleSaveCard() {
    console.log(movie);
    saveMovie(movie, token, currentUser._id).then((res) => {
      console.log(res);
      // setMovieId(res._id);
      setCardSaved(true);
    });
  }

  function handleDelCard() {
    console.log(movie)
    delMovie(movieId, token).then((res) => {
      console.log(res);
      setCardSaved(false);
    }).catch(err => {
      console.log(err)
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
        <img className="movies-card__image" alt="" src={img} />
      </div>
      <button className={buttonClass} onClick={handleButtonClick}>
        {buttonText}
      </button>
    </div>
  );
}

export default MoviesCard;
