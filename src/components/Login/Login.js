import "./Login.css";
import React from "react";
import HeaderRegLog from "../HeaderRegLog/HeaderRegLog";
import LoginForm from "../LoginForm/LoginForm";
import { NavLink } from "react-router-dom";

function Login({handleLogIn, tokenCheck}) {

  React.useEffect(() => {
    // tokenCheck();
  }, []);

  const text = "Рады видеть!";
  return (
    <div className="login">
      <HeaderRegLog title={text} />
      <LoginForm handleLogIn = {handleLogIn}/>
      <div className="login__container">
        <span className="login__text">Ещё не зарегистрированы?</span>
				<NavLink className="login__link" to="/signup">Регистрация</NavLink>
      </div>
    </div>
  );
}

export default Login; 


