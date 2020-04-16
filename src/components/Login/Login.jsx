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
import "./Login.scss";
import styles from "./../common/FormControls/FormControls.module.css";
let maxLength30 = maxLengthCreator(50);
const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className="loginForm">
      <h2 className="loginAuth">Авторизация</h2>
      <div>
        <Field
          placeholder={"Login*"}
          name={"login"}
          component={Input}
          validate={[required, maxLength30, notlogin]}
        />
      </div>
      <div>
        <Field
          placeholder={"Password*"}
          name={"password"}
          type={"password"}
          component={Input}
          validate={[required, maxLength30, notPassword]}
        />
      </div>

      {props.error && (
        <div className={styles.formSummaryError}>{props.error}</div>
      )}
      <div>
        <button>Войти</button>
        <NavLink to="/register">
          <a href="#">Нет аккаунта? Регистрация</a>
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
    if (formData.login === "Smit" && formData.password === "1234") {
      return history.push("/profile");
    }
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
