import React from "react";
import { NavLink } from "react-router-dom";
import "./../Login/Login.scss";
const Register = () => {
  return (
    <div className="loginForm">
      <h2 className="loginAuth">Авторизация</h2>
      <input type="text" placeholder="Логин*" />
      <input type="text" placeholder="Имя*" />
      <input type="text" placeholder="Пароль*" />
      <input type="text" placeholder="Повторите пароль*" />
      <p>* поле обязательное для заполнения</p>
      <button className="regBtn">Создать аккаунт</button>

      <NavLink to="/login">
        <a href="#">Есть аккаунт? Войти в систему</a>
      </NavLink>
    </div>
  );
};

export default Register;
