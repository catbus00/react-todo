import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import style from './TodoListToggle.module.css'

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
    <div className="dropdown">
      <button className={style['button']} onClick={toggleSortOrder}>
        Sort by Title: {titleSortOrder === 'asc' ? 'Ascending' : 'Descending'}
      </button>
    </div>
  );
}

export default TodoListToggle;
