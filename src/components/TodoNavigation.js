import React from 'react';
import style from './TodoNavigation.module.css';
import hamburgerMenu from '../assets/hamburger-menu.svg';
import user from '../assets/user.svg';
import dropdown from '../assets/dropdown.svg';

function TodoNavigation() {
  return (
    <div className={style.container}>
      <div className={style['left-column']}> 
      <img src={hamburgerMenu} alt="Hamburger Menu" />
      </div>
      <div className={style['right-column']}>
      <img src={user} alt="Hamburger Menu" />
      <img src={dropdown} alt="Hamburger Menu" />
      </div>
    </div>
  );
}

export default TodoNavigation;
