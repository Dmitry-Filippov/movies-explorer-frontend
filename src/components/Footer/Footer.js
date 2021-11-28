import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__underline">
        <p className="footer__year">&copy; {new Date().getFullYear()}</p>
				<ul className="footer__links">
					<li className="footer__link"><a href="https://practicum.yandex.ru">Яндекс.Практикум</a></li>
					<li className="footer__link"><a href="https://github.com">Github</a></li>
					<li className="footer__link"><a href="https://www.facebook.com">Facebook</a></li>
				</ul>
      </div>
    </footer>
  );
}

export default Footer; 
