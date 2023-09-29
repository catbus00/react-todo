import React from 'react';
import { Link } from 'react-router-dom';
import style from './TodoLanding.module.css';

function TodoLanding() {

  return (
    <div>
    <center>
    <h1 className={style.todoLandingH1}>Welcome to the To-Do List App</h1>
    <Link to="/home">
    <button>
        Let's Start!
    </button>
    </Link>
    </center>
    </div>
  );
}

export default TodoLanding; 