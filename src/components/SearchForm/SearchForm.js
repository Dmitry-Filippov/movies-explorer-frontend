import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm({handleMoviesSearch}) {
  function handleError() {
    console.log("no input, error");
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    if (!e.target[0].value) {
      handleError();
    } else {
      handleMoviesSearch(e.target[0].value);
    }
  }
  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleFormSubmit}>
        <input
          className="search-form__input"
          placeholder="Фильм"
          required
        ></input>
        <button className="search-form__button" type="submit">
          Найти
        </button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
