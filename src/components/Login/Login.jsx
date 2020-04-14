import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./Login.scss";

const Login = (props) => {
  debugger;
  let history = useHistory();
  const startapp = () => {};
  const Id = () => {
    if (props !== null) return props.users.map((u) => u.id);
  };
  const [inputValue, setInputValue] = useState("");

  const loginClick = () => {
    if (inputValue) {
      props.login(Id(), inputValue);

      axios
        .patch("http://localhost:3001/users/" + Id(), {
          login: inputValue,
        })
        .then((res) => {
          if (res.status === 200) return history.push("/profile");
        });
      setInputValue("");
    }
  };

  return (
    <>
      <div className="loginForm">
        <h2 className="loginAuth">Авторизация</h2>
        <input
          type="text"
          placeholder="Логин*"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input type="text" placeholder="Пароль*" />
        <p>* поле обязательное для заполнения</p>
        <button onClick={loginClick}>Войти</button>

        <NavLink to="/register">
          <a href="#">Нет аккаунта? Регистрация</a>
        </NavLink>
      </div>{" "}
      {/* <div className="loginForm popupLogin">
        <h3>Регистрация прошла успешно</h3>
        <button onClick={startapp}>Начать работу</button>
        <div className="ovarlay"></div>
      </div> */}
    </>
  );
};

export default Login;
