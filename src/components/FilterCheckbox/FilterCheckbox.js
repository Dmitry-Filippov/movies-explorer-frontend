import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <input className="filter-checkbox__checkbox" type="checkbox" id="checkbox"></input>
			<label className="filter-checkbox__checkbox-custom" htmlFor="checkbox"></label>
      <span className="filter-checkbox__text">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
