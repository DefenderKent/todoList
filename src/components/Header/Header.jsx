import React from "react";
import "./Header.scss";
import logout from "./../../assets/img/logout.png";
const Header = (props) => {
  return (
    <div>
      <div className="headerTodo">
        <h2>{props.users !== null && props.users.map((u) => u.login)}</h2>
        <div>
          <img src={logout} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
