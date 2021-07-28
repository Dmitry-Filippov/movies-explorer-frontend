import './Header.css';

function Header() {
	return (
		<header className="header">
			<div className="header__logo"></div>
			<div className="header__wrapper">
				<button className="header__register">Регистрация</button>
				<button className="header__login">Войти</button>
			</div>
		</header>
	)
};

export default Header;