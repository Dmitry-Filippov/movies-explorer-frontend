import "./AboutMe.css";
import arrowImg from "../../images/arrow.png";

function AboutMe() {
  const myAge = new Date().getFullYear() - 1997;

  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__student">
        <div className="about-me__info">
          <h3 className="about-me__student-name">Дмитрий</h3>
          <p className="about-me__subtitle">Веб-разработчик, {myAge} года</p>
          <p className="about-me__text">
            Я родился и живу в Подольске. Люблю слушать музыку, а ещё увлекаюсь
            бегом и велосипедом. Когда начался локдаун в 2020 году, я попробовал
            себя во фронтенд разработке и увлёкся. Прошел курс на
            Яндекс.Практикуме и теперь пытаюсь найти своё место в мире IT.
          </p>
          <ul className="about-me__nav">
            <li className="about-me__link">
              <a href="#">Facebook</a>
            </li>
            <li className="about-me__link">
              <a href="#">Github</a>
            </li>
          </ul>
        </div>
        <img
          className="about-me__photo"
          src="https://sun9-28.userapi.com/impf/c846323/v846323525/81e40/Ryh39UMEv6k.jpg?size=720x960&quality=96&sign=ce1755e887ff4916b0383bdff5bfb901&type=album"
          alt="photo"
        />
      </div>
      <h3 className="about-me__portfolio">Портфолио</h3>
      <ul className="about-me__portfolio-nav">
        <li className="about-me__navlink">
          <p>Статичный сайт</p>
          <a className="about-me__linkimg" href="#">
            <img src={arrowImg} alt="" />
          </a>
        </li>
        <li className="about-me__navlink">
          <p>Адаптивный сайт</p>
          <a className="about-me__linkimg" href="#">
            <img src={arrowImg} alt="" />
          </a>
        </li>
        <li className="about-me__navlink">
          <p>Одностраничное приложение</p>
          <a className="about-me__linkimg" href="#">
            <img src={arrowImg} alt="" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default AboutMe;
