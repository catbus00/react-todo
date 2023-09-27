import React from 'react';
import PropTypes from 'prop-types';
import TodoListItem from './TodoListItem';

const TodoList = ({
  todoList, onRemoveTodo, isChecked, handleChange,
}) => {
  
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemoveTodo={onRemoveTodo}
          isChecked={isChecked[todo.id]}
          handleChange={() => handleChange(todo.id)}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  isChecked: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TodoList;