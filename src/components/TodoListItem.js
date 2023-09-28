import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

function TodoListItem({
  todo, onRemoveTodo, isChecked, handleChange,
}) {
  const onRemoveClick = () => {
    onRemoveTodo(todo.id);
  };

  const handleCheckboxChange = () => {
    handleChange(todo.id);
  };

  TodoListItem.propTypes = {
    todo: PropTypes.object.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
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