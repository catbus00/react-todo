import React from "react";
import { Link } from "react-router-dom";
import style from "./TodoLanding.module.css";
import woman from "../assets/woman.svg";

function TodoLanding() {
  return (
    <center>
      <div className={style.todoLandingContainer}>
        <img src={woman} alt="woman" />
        <h1 className={style.todoLandingH1}>Welcome to the To-Do List App</h1>
        <Link to="/home" className={style.todoLandingLink}>
          <button className={style.todoLandingButton}>Let's Start!</button>
        </Link>
      </div>
    </center>
  );
}

export default TodoLanding;
