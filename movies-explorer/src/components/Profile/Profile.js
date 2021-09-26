import "./Profile.css";
import HeaderAlt from "../HeaderAlt/HeaderAlt";
import HeaderBurg from "../HeaderBurg/HeaderBurg";

function Profile({ handleBurgerMenuClick}) {
  const name = "Дмитрий";
  const email = "dima197@ya.com";
  return (
    <div className="profile">
      <HeaderAlt />
      <HeaderBurg
        handleBurgerMenuClick={handleBurgerMenuClick}
      />
      <h1 className="profile__greating">Привет, {name}!</h1>
      <div className="profile__text-line">
        <p className="profile__text">Имя</p>
        <p className="profile__text">{name}</p>
      </div>
      <div className="profile__text-line profile__text-line_email">
        <p className="profile__text">E-mail</p>
        <p className="profile__text">{email}</p>
      </div>
      <button className="profile__edit-button">Редактировать</button>
      <button className="profile__exit-button">Выйти из аккаунта</button>
    </div>
  );
}

export default Profile; 
