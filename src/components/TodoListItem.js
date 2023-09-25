import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

function TodoListItem({
  todo, removeTodo, isChecked, handleChange,
}) {
  const onRemoveClick = () => {
    removeTodo(todo.id);
  };

  const handleCheckboxChange = () => {
    handleChange(todo.id);
  };

  TodoListItem.propTypes = {
    todo: PropTypes.object.isRequired,
    removeTodo: PropTypes.func.isRequired,
    isChecked: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
  };
  
  return (
    <ul>
      <li>
        <div className="item-container">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          {todo.title}
        </div>
        <button
          type="submit"
          className="custom-button"
          onClick={onRemoveClick}
        >
          Remove
        </button>
      </li>
    </ul>
  );
}

export default TodoListItem;
