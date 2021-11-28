import { Link } from "react-router-dom";
import "../Header/Header.css";
import "./HeaderBurg.css";

function HeaderBurg({handleBurgerMenuClick}) {
  return (
    <header className="header header-burg">
      <Link className="header__logo" to="/"></Link>
      <div className="header-burg__burger" onClick={handleBurgerMenuClick} ></div>
    </header>
  );
}

export default HeaderBurg;
