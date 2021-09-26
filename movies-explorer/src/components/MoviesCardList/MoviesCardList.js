import MoviesCard from "../MoviesCard/MoviesCard"
import "./MoviesCardList.css"

function MoviesCardList(props) {
  return (
		<section className="movies-cardlist">
			{props.children} 
		</section>
	)
};


export default MoviesCardList;