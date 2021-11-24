import { NavLink } from "react-router-dom";
import HeaderRegLog from "../HeaderRegLog/HeaderRegLog";
import RegisterForm from "../RegisterForm/RegisterForm";
import "./Register.css";

function Register({ handleRegister, isRegisterWrong }) {
  const title = "Добро пожаловать!";
  return (
    <div className="register">
      <HeaderRegLog title={title} />
      <RegisterForm
        handleRegister={handleRegister}
        isRegisterWrong={isRegisterWrong}
      />
      <div className="register__container">
        <span className="register__text">Уже зарегистрированы?</span>
        <NavLink to="/signin" className="register__link">
          Войти
        </NavLink>
      </div>
    </div>
  );
}

export default Register;
