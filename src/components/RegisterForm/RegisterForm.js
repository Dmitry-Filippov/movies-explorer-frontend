import "./RegisterForm.css";

function RegisterForm() {
  return (
    <form className="register-form">
      <span className="register-form__span">Имя</span>
      <input
        className="register-form__input register-form__input_type_name"
        type="text"
				placeholder="Иван"
      ></input>
      <span className="register-form__span">E-mail</span>
      <input
        className="register-form__input register-form__input_type_email"
        type="email"
				placeholder="ivanivanov@example.com"
      ></input>
      <span className="register-form__span">Пароль</span>
      <input
        className="register-form__input register-form__input_type_password"
        type="password"
      ></input>
      <span className="register-form__span register-form__span_type_err">
        Что-то пошло не так...
      </span>
			<button className="register-form__submit" type="submit">Зарегистрироваться</button>
    </form>
  ); 
}

export default RegisterForm;
