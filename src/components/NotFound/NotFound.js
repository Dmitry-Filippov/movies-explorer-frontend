import "./NotFound.css";
import { NavLink } from "react-router-dom";

function NotFound() {
  return (
		<div className="not-found">
			<h1 className="not-found__title">404</h1>
			<p className="not-found__text">Страница не найдена</p>
			<NavLink className="not-found__link" to="/">Назад</NavLink>
		</div>
	)
};

export default NotFound;