import "./LoginForm.css";
import validator from "validator";
import React from "react";

function LoginForm({ handleLogIn }) {
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
      setPasswordValid(false);
    }
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    handleLogIn(email, password);
  }

  return (
    <form className="login-form" onSubmit={handleFormSubmit}>
      <span className="login-form__span">E-mail</span>
      <input
        className="login-form__input login-form__input_type_email"
        type="email"
        onChange={handleEmailChange}
      ></input>
      <span className="login-form__span">Пароль</span>
      <input
        className="login-form__input login-form__input_type_password"
        type="password"
        onChange={handlePasswordChange}
      ></input>
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
