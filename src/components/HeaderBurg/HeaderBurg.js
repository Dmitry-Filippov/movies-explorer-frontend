import "../Header/Header.css";
import "./HeaderBurg.css";

function HeaderBurg({handleBurgerMenuClick}) {
  return (
    <header className="header header-burg">
      <div className="header__logo"></div>
      <div className="header-burg__burger" onClick={handleBurgerMenuClick} ></div>
    </header>
  );
}

export default HeaderBurg;
