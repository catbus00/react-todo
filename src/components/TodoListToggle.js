import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import style from './TodoListToggle.module.css'
import sortup from '../assets/sortup.svg';
import sortdown from '../assets/sortdown.svg';

function TodoListToggle({ updateSortOrder }) {
  const [titleSortOrder, setTitleSortOrder] = useState('asc');

  const toggleSortOrder = () => {
    const newSortOrder = titleSortOrder === 'asc' ? 'desc' : 'asc';
    setTitleSortOrder(newSortOrder);
    updateSortOrder(newSortOrder);
  };

  TodoListToggle.propTypes = {
    updateSortOrder: PropTypes.func.isRequired,
  };

  return (
    <div className="toggleContainer">
      <button className={style.toggleButton} onClick={toggleSortOrder}>
        Sort {titleSortOrder === 'asc' ? <img src={sortup} alt="Sort Up" /> : <img src={sortdown} alt="Sort Down" />}
      </button>
    </div>
  );
}

export default TodoListToggle;
