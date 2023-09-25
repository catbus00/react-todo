import React from 'react';
import PropTypes from 'prop-types';
import TodoListItem from './TodoListItem';

function TodoList({
  todoList, removeTodo, isChecked, handleChange,
}) {

  TodoList.propTypes = {
    todoList: PropTypes.array.isRequired,
    removeTodo: PropTypes.func.isRequired,
    isChecked: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
  };
  
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          removeTodo={removeTodo}
          isChecked={isChecked[todo.id]}
          handleChange={() => handleChange(todo.id)}
        />
      ))}
    </ul>
  );
}

export default TodoList;
