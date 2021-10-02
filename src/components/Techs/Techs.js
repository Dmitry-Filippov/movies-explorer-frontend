import "./Techs.css";

function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__header">7 технологий</h3>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <div className="techs__grid">
        <div className="techs__grid-item">
          <p className="techs__grid-text">HTML</p>
        </div>
        <div className="techs__grid-item">
          <p className="techs__grid-text">CSS</p>
        </div>
        <div className="techs__grid-item">
          <p className="techs__grid-text">JS</p>
        </div>
        <div className="techs__grid-item">
          <p className="techs__grid-text">React</p>
        </div>
        <div className="techs__grid-item">
          <p className="techs__grid-text">Git</p>
        </div>
        <div className="techs__grid-item">
          <p className="techs__grid-text">Express.js</p>
        </div>
        <div className="techs__grid-item">
          <p className="techs__grid-text">mongoDB</p>
        </div>
      </div> 
    </section> 
  );
}

export default Techs;
