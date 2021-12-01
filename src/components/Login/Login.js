import "./Login.css";
import React from "react";
import HeaderRegLog from "../HeaderRegLog/HeaderRegLog";
import LoginForm from "../LoginForm/LoginForm";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";

function Login({ handleLogIn, loggedIn, isLogInWrong }) {
  const history = useHistory();
  if (loggedIn) {
    history.push('/movies')
  }

  const text = "Рады видеть!";
  return (
    <div className="login">
      <HeaderRegLog title={text} />
      <LoginForm handleLogIn={handleLogIn} isLogInWrong={isLogInWrong} />
      <div className="login__container">
        <span className="login__text">Ещё не зарегистрированы?</span>
        <NavLink className="login__link" to="/signup">
          Регистрация
        </NavLink>
      </div>
    </div>
  );
}

export default Login;
