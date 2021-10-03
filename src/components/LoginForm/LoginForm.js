import "./LoginForm.css";

function LoginForm() {
  return (
    <form className="login-form">
      <span className="login-form__span">E-mail</span>
      <input
        className="login-form__input login-form__input_type_email"
        type="email"
      ></input>
      <span className="login-form__span">Пароль</span>
      <input
        className="login-form__input login-form__input_type_password"
        type="password"
      ></input>
			<button className="login-form__submit" type="submit">Войти</button>
    </form>
  );
};

export default LoginForm;
