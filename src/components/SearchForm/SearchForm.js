import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm({ handleMoviesSearch, handleCheckboxClick }) {
  const [isInputInvalid, setInputInvalid] = React.useState(false);

  function handleError() {
    console.log("no input, error");
    setInputInvalid(true);
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    if (!e.target[0].value) {
      handleError();
    } else {
      // setInputInvalid(false)
      handleMoviesSearch(e.target[0].value);
    }
  }
  return (
    <section className="search-form">
      <form
        className="search-form__form"
        onSubmit={handleFormSubmit}
        noValidate
      >
        <input
          className="search-form__input"
          placeholder="Фильм"
          required
          onChange={() => {
            setInputInvalid(false);
          }}
        ></input>
        {isInputInvalid ? (
          <span className="search-form__error">
            Нужно ввести ключевое слово
          </span>
        ) : (
          <div></div>
        )}
        <button className="search-form__button" type="submit">
          Найти
        </button>
      </form>
      <FilterCheckbox handleCheckboxClick={handleCheckboxClick} />
    </section>
  );
}

export default SearchForm;
