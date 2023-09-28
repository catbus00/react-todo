import React from 'react';
import { Link } from 'react-router-dom';


function TodoLanding() {

  return (
    <div>
    <center>
    <h1> Welcome to the To-Do List App</h1>
    <Link to="/">
    <button>
        Let's Start!
    </button>
    </Link>
    </center>
    </div>
  );
}

export default TodoLanding; 