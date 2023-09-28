import React from 'react';
import PropTypes from 'prop-types';
import TodoListItem from './TodoListItem';

const TodoList = ({
  todoList, onRemoveTodo, handleChange,
}) => {
  
  return (
    <ul>
        {todoList.map((todo) => {
        const { id } = todo;  
      
        return <TodoListItem
          key={id}
          todo={todo}
          onRemoveTodo={onRemoveTodo}
          isChecked={false} 
          handleChange={() => handleChange(id)}
        />
      })}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  isChecked: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TodoList;