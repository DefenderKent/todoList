import React from "react";
import {
  required,
  maxLengthCreator,
  notlogin,
  notPassword,
} from "./../../utils/validators/validators";
import { Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Route, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Input } from "./../common/FormControls/FormControls";
import "./../Login/Login.scss";
import styles from "./../common/FormControls/FormControls.module.css";
let maxLength30 = maxLengthCreator(50);
const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className="loginForm">
      <h2 className="loginAuth">Регистрация</h2>
      <div>
        <Field
          placeholder={"Логин*"}
          name={"login"}
          component={Input}
          validate={[required, maxLength30]}
        />
      </div>
      <div>
        <div>
          <Field
            placeholder={"Имя*"}
            name={"name"}
            component={Input}
            validate={[required, maxLength30]}
          />
        </div>
        <Field
          placeholder={"Пароль*"}
          name={"password"}
          type={"password"}
          component={Input}
          validate={[required, maxLength30]}
        />
        <div>
          <Field
            placeholder={"Повторите пароль*"}
            name={"passwordrep"}
            type={"password"}
            component={Input}
            validate={[required, maxLength30]}
          />
        </div>
      </div>

      {props.error && (
        <div className={styles.formSummaryError}>{props.error}</div>
      )}
      <div>
        <button>Создать аккаунт</button>
        <NavLink to="/">
          <a href="#">Есть аккаунт? Войти в систему</a>
        </NavLink>
      </div>
    </form>
  );
};
const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

const Login = (props) => {
  let history = useHistory();
  const onSubmit = (formData) => {
    debugger;

    return console.log(formData);

    // return notlogin(formData.login, formData.password);
  };
  return (
    <>
      <LoginReduxForm onSubmit={onSubmit} />
    </>
  );
};
const mapStateToProps = (props) => ({
  login: props.name,
});
export default connect(mapStateToProps, {})(Login);
