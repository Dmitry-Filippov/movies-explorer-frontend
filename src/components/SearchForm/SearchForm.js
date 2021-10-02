import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
	return (
		<section className="search-form">
			<form className="search-form__form">
				<input className="search-form__input" placeholder="Фильм" required></input>
				<button className="search-form__button" type="submit">Найти</button>
			</form>
			<FilterCheckbox />
		</section>
	)
}

export default SearchForm; 