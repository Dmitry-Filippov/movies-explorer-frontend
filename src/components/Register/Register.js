import { NavLink } from "react-router-dom";
import HeaderRegLog from "../HeaderRegLog/HeaderRegLog";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useHistory } from "react-router";
import "./Register.css";

function Register({ handleRegister, isRegisterWrong, loggedIn }) {
  const history = useHistory();
  if (loggedIn) {
    history.push('/movies');
  }
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
