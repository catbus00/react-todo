import React from "react";
import PropTypes from "prop-types";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todoList, onRemoveTodo, handleChange, isChecked }) => {
  return (
    <ul>
      {todoList.map((todo) => {
        const { id } = todo;

        return (
          <TodoListItem
            key={id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            isChecked={todo.true}
            handleChange={() => handleChange(id)}
          />
        );
      })}
    </ul>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  isChecked: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TodoList;
