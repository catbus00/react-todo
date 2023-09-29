import React from 'react';
import PropTypes from 'prop-types';
import style from './TodoListItem.module.css'

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
    <li>
    <div className={style.todoListThreeColumn}>
        <div className={style.todoListColumn1}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className={style.todoListColumn2}>
          {todo.title}
        </div>
        <div className={style.todoListColumn3}>
          <button
            type="submit"
            className={style.todoListItemButton}
            onClick={onRemoveClick}
          >
            Remove
          </button>
        </div>
    </div>  
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TodoListItem;