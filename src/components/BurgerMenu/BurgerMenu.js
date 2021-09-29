import { Link, NavLink } from "react-router-dom";
import "./BurgerMenu.css";
import profileLink from "../../images/profile-link.svg";

function BurgerMenu({ isOpened, handleBurgerPopUpClose }) {
  let divClass;
  if (isOpened === true) {
    divClass = "burger-menu burger-menu__opened";
  } else {
    divClass = "burger-menu";
  }
  return (
    <div className={divClass}>
      <div className="burger-menu__background">
        <button
          className="burger-menu__close"
          onClick={handleBurgerPopUpClose}
        ></button>
        <div className="burger-menu__wraper">
          <NavLink
            to="/"
            className="burger-menu__link"
            onClick={handleBurgerPopUpClose}
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className="burger-menu__link burger-menu__link_active"
            onClick={handleBurgerPopUpClose}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="burger-menu__link"
            onClick={handleBurgerPopUpClose}
          >
            Сохранённые фильмы
          </NavLink>
        </div>
        <Link
          to="/profile"
          className="burger-menu__profile-link"
          onClick={handleBurgerPopUpClose}
        >
          <img alt="" src={profileLink} />
        </Link>
      </div>
    </div>
  );
}

export default BurgerMenu;
