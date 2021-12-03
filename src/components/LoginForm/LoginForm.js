import "./LoginForm.css";
import validator from "validator";
import React from "react";

function LoginForm({ handleLogIn, isLogInWrong }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isEmailValid, setEmailValid] = React.useState(false);
  const [isPasswordValid, setPasswordValid] = React.useState(false);
  const [isButtonAvalable, setButtonAvalable] = React.useState(false);

  React.useEffect(() => {
    if (isEmailValid && isPasswordValid) {
      setButtonAvalable(true);
    } else {
      setButtonAvalable(false);
    }
  }, [isEmailValid, isPasswordValid]);

  React.useEffect(() => {
    if (validator.isEmail(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }, [email]);

  React.useEffect(() => {
    if (password !== "") {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  }, [password]);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    handleLogIn(email, password);
  }

  return (
    <form className="login-form" onSubmit={handleFormSubmit}>
      <span className="login-form__span">E-mail</span>
      <input
        className={`login-form__input login-form__input_type_email ${
          isEmailValid ? "" : "login-form__input_invalid"
        }`}
        type="email"
        onChange={handleEmailChange}
      ></input>
      {isEmailValid ? (
        <div></div>
      ) : (
        <span className="login-form__span login-form__span_type_err">
          Невалидный Email
        </span>
      )}
      <span className="login-form__span">Пароль</span>
      <input
        className={`login-form__input login-form__input_type_email ${
          isPasswordValid ? "" : "login-form__input_invalid"
        }`}
        type="password"
        onChange={handlePasswordChange}
      ></input>
      {isPasswordValid ? (
        <div></div>
      ) : (
        <span className="login-form__span login-form__span_type_err">
          Введите пароль
        </span>
      )}
      {isLogInWrong ? (
        <span className="login-form__span login-form__span_type_err">
          Что-то пошло не так...
        </span>
      ) : (
        <div></div>
      )}
      <button
        className="login-form__submit"
        type="submit"
        disabled={isButtonAvalable ? false : true}
      >
        Войти
      </button>
    </form>
  );
}

export default LoginForm;
