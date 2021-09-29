import '../Header/Header.css';
import './HeaderAlt.css'

function HeaderAlt() {
  return (
    <header className="header header-alt">
      <div className="header__logo"></div>
      <div className="header-alt__wrapper">
        <button className="header-alt__films">Фильмы</button>
        <button className="header-alt__saved">Сохранённые фильмы</button>
      </div>
      <button className="header-alt__profile"></button>
    </header>
  );
};

export default HeaderAlt;
