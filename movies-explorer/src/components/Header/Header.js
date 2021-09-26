import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
	return (
		<header className="header">
			<div className="header__logo"></div>
			<div className="header__wrapper">
				<Link to="/signup" className="header__register">Регистрация</Link>
				<Link to="/signin" className="header__login">Войти</Link>
			</div>
		</header>
	)
};

export default Header;