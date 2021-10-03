import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__flex-container">
        <div className="about-project__flex-item">
          <h3 className="about-project__item-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__flex-item">
          <h3 className="about-project__item-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__progress-line">
        <div className="about-project__one-week">
          <p>1 неделя</p>
        </div>
        <div className="about-project__four-weeks"><p>4 недели</p></div>
      </div>
      <div className="about-project__progress-line about-project__progress-line_text">
        <p className="about-project__paragraph">Back-end</p>
        <p className="about-project__paragraph">Front-end</p>
      </div>
    </section>
  ); 
}

export default AboutProject;
