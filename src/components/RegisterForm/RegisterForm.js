import React from "react";
import validator from "validator";
import "./RegisterForm.css";

function RegisterForm({ handleRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [isNameValid, setNameValid] = React.useState(false);
  const [isEmailValid, setEmailValid] = React.useState(false);
  const [isPasswordValid, setPasswordValid] = React.useState(false);
  const [isButtonAvalable, setButtonAvalable] = React.useState(false);

  React.useEffect(() => {
    if (isNameValid && isEmailValid && isPasswordValid) {
      setButtonAvalable(true);
    } else {
      setButtonAvalable(false);
    }
  }, [isNameValid, isEmailValid, isPasswordValid]);

  function handleNameChange(e) {
    setName(e.target.value);
    if (name.length > 0) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
    if (validator.isEmail(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
    if (password !== "") {
      setPasswordValid(true);
    } else {
      setPasswordValid(false)
    }
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(email, name, password);
    handleRegister(name, email, password);
  }

  return (
    <form className="register-form" onSubmit={handleFormSubmit}>
      <span className="register-form__span">Имя</span>
      <input
        className={`register-form__input register-form__input_type_name ${
          isNameValid ? "" : "register-form__input_errored"
        }`}
        type="text"
        placeholder="Иван"
        onChange={handleNameChange}
        value={name}
        required
      ></input>
      <span className="register-form__span">E-mail</span>
      <input
        className={`register-form__input register-form__input_type_email ${
          isEmailValid ? "" : "register-form__input_errored"
        }`}
        type="email"
        placeholder="ivanivanov@example.com"
        onChange={handleEmailChange}
        value={email}
        required
      ></input>
      <span className="register-form__span">Пароль</span>
      <input
        className="register-form__input register-form__input_type_password"
        type="password"
        onChange={handlePasswordChange}
        value={password}
        required
      ></input>
      <span className="register-form__span register-form__span_type_err">
        Что-то пошло не так...
      </span>
      <button
        className="register-form__submit"
        type="submit"
        disabled={isButtonAvalable ? false : true}
      >
        Зарегистрироваться
      </button>
    </form>
  );
}

export default RegisterForm;
