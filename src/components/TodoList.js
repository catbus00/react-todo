import React from "react";
import PropTypes from "prop-types";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todoList, onRemoveTodo, handleChange, areChecked }) => {
  return (
    <ul>
      {todoList.map((todo, index) => {
        const { id } = todo;

        return (
          <TodoListItem
            key={id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            idChecked={areChecked[index]}
            handleChange={(done) => handleChange(id, done)}
          />
        );
      })}
    </ul>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  areChecked: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TodoList;
