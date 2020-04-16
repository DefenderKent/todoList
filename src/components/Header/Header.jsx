import React from "react";
import "./Header.scss";
import logout from "./../../assets/img/logout.png";
import { Route, useHistory } from "react-router-dom";
import axios from "axios";

const Header = (props) => {
  let history = useHistory();
  const logoutClick = () => {
    history.push("/");
  };

  return (
    <div>
      <div className="headerTodo">
        <h2>{props.users !== null && props.login}</h2>
        <div>
          <img onClick={logoutClick} src={props.login && logout} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
