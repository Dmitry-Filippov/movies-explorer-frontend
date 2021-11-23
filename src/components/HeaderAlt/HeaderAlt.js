import { Link } from 'react-router-dom';
import '../Header/Header.css';
import './HeaderAlt.css'

function HeaderAlt() {
  return (
    <header className="header header-alt">
      <div className="header__logo"></div>
      <div className="header-alt__wrapper">
        <Link className="header-alt__films" to="/movies">Фильмы</Link>
        <Link className="header-alt__saved" to="/saved-movies">Сохранённые фильмы</Link>
      </div>
      <Link className="header-alt__profile" to="/profile"></Link>
    </header>
  );
};

export default HeaderAlt;
