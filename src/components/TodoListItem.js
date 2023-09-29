import React from 'react';
import PropTypes from 'prop-types';
import style from './TodoListItem.css'

function TodoListItem({
  todo, onRemoveTodo, isChecked, handleChange,
}) {
  const onRemoveClick = () => {
    onRemoveTodo(todo.id);
  };

  const handleCheckboxChange = () => {
    handleChange(todo.id);
  };
  
  return (
    <ul>
      <li>
        <div>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          {todo.title}
        </div>
        <button
          type="submit"
          className={style.todoButton}
          onClick={onRemoveClick}
        >
          Remove
        </button>
      </li>
    </ul>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TodoListItem;