import cardImage from "../../images/movies-card__img.jpg";
import "./MoviesCard.css"

function MoviesCard() {
  return (
		<div className="movies-card">
			<h2 className="movies-card__title">В погоне за Бенкси</h2>
			<p className="movies-card__duration">27 минут</p>
			<img className="movies-card__image" alt="" src={cardImage}/>
			<button className="movies-card__button">Сохранить</button>
		</div>
	)
};


export default MoviesCard;