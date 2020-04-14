import React from "react";
import "./Login.scss";
const Login = () => {
  return (
    <div className="loginForm">
      <h2 className="loginAuth">Авторизация</h2>
      <input type="text" placeholder="Логин*" />
      <input type="text" placeholder="Пароль*" />
      <p>* поле обязательное для заполнения</p>
      <button>Войти</button>
      <a href="#">Нет аккаунта? Регистрация</a>
    </div>
  );
};

export default Login;
