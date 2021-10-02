import React from "react";
import cardImage from "../../images/movies-card__img.jpg";
import "./MoviesCard.css";

function MoviesCard({buttonClass, buttonText}) {
  return (
    <div className="movies-card">
      <h2 className="movies-card__title">В погоне за Бенкси</h2>
      <p className="movies-card__duration">27 минут</p>
      <img className="movies-card__image" alt="" src={cardImage} />
      <button className={buttonClass}>{buttonText}</button>
    </div>
  );
}

export default MoviesCard;
