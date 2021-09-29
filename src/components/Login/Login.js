import "./Login.css";
import HeaderRegLog from "../HeaderRegLog/HeaderRegLog";
import LoginForm from "../LoginForm/LoginForm";
import { NavLink } from "react-router-dom";

function Login() {
  const text = "Рады видеть!";
  return (
    <div className="login">
      <HeaderRegLog title={text} />
      <LoginForm />
      <div className="login__container">
        <span className="login__text">Ещё не зарегистрированы?</span>
				<NavLink className="login__link" to="/signup">Регистрация</NavLink>
      </div>
    </div>
  );
}

export default Login; 
