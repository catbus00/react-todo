import React from "react";
import { Link } from "react-router-dom";
import style from "./TodoNavigation.module.css";
import hamburgerMenu from "../assets/hamburger-menu.svg";
import user from "../assets/user.svg";
import dropdown from "../assets/dropdown.svg";

function TodoNavigation() {
  return (
    <div className={style.navigationContainer}>
      <div className={style.leftColumn}>
        <Link to="/" className={style.todoNavigationLink}>
          <img src={hamburgerMenu} alt="Hamburger Menu" />
        </Link>
      </div>
      <div className={style.rightColumn}>
        <img src={user} alt="User Icon" />
        <img src={dropdown} alt="Dropdown Icon" />
      </div>
    </div>
  );
}

export default TodoNavigation;
