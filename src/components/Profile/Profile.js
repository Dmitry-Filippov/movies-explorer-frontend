import "./Profile.css";
import HeaderAlt from "../HeaderAlt/HeaderAlt";
import HeaderBurg from "../HeaderBurg/HeaderBurg";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { patchUser } from "../../utils/MainApi";

function Profile({ handleBurgerMenuClick, handleLogOut }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [newName, setNewName] = React.useState(null);
  const [newEmail, setNewEmail] = React.useState(null);
  const [isButtonAvalable, setButtonAvalable] = React.useState(false);
  const [isUserUpdated, setUserUpdated] = React.useState(false);
  const [isError, setError] = React.useState(false);

  function handleNameInputChange(e) {
    setNewName(e.target.value);
  }
  function handleEmailInputChange(e) {
    setNewEmail(e.target.value);
  }
  function handleProfileChange() {
    patchUser(
      `${newName ? newName : name}`,
      `${newEmail ? newEmail : email}`,
      localStorage.getItem("token")
    )
      .then((res) => {
        setName(res.name);
        setEmail(res.email);
        setError(false);
        setUserUpdated(true);
      })
      .catch((err) => {
        setUserUpdated(false);
        setError(true);
      });
  }

  React.useEffect(() => {
    if (newName === name && newEmail === email) {
      setButtonAvalable(false);
    } else {
      setButtonAvalable(true);
    }
  }, [newName, newEmail, name, email]);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setButtonAvalable(false);
    setUserUpdated(false);
    setError(false);
  }, []);

  return (
    <div className="profile">
      <HeaderAlt />
      <HeaderBurg handleBurgerMenuClick={handleBurgerMenuClick} />
      <h1 className="profile__greating">Привет, {name}!</h1>
      <div className="profile__text-line">
        <p className="profile__text">Имя</p>
        <input
          className="profile__text"
          defaultValue={name}
          onChange={handleNameInputChange}
        ></input>
      </div>
      <div className="profile__text-line profile__text-line_email">
        <p className="profile__text">E-mail</p>
        <input
          className="profile__text"
          defaultValue={email}
          onChange={handleEmailInputChange}
        ></input>
      </div>
      {isUserUpdated ? (
        <span className="profile__notification">Данные успешно обновлены!</span>
      ) : (
        <div></div>
      )}
      {isError ? (
        <span className="profile__notification_err">Что-то пошло не так!</span>
      ) : (
        <div></div>
      )}
      {/* <span  className="profile__notification">Данныеуспешно обновлены!</span> */}
      <button
        className="profile__edit-button"
        onClick={handleProfileChange}
        disabled={isButtonAvalable ? false : true}
      >
        Редактировать
      </button>
      <button className="profile__exit-button" onClick={handleLogOut}>
        Выйти из аккаунта
      </button>
    </div>
  );
}

export default Profile;
