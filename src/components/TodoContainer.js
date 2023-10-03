import React, { useState, useEffect, useCallback } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import TodoListToggle from "./TodoListToggle";
import api from "./Api";
import style from "./App.css";
import PropTypes from "prop-types";
import TodoNavigation from "./TodoNavigation";

const TodoContainer = ({ tableName }) => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [areChecked, setAreChecked] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

  const checkTodo = useCallback(async (id, done) => {
    await api.checkTodo(id, done);
  });
  const fetchAndSortTodos = useCallback(async () => {
    const sortOptions = `?sort[0][field]=title&sort[0][direction]=asc`;

    const sortedTodos = await api.fetchAndSortTodos(tableName, sortOptions);
    const checkedTodos = sortedTodos.map(({id, isChecked}) => isChecked ? id : undefined);
    console.log(checkedTodos);

    setTodoList(sortedTodos);
    setIsLoading(false);
    setAreChecked(checkedTodos);
  }, [tableName]);

  useEffect(() => {
    fetchAndSortTodos();
  }, [fetchAndSortTodos, checkTodo]);

  const toggleSortOrder = () => {
    setIsAscending((prevIsAscending) => !prevIsAscending);

    const sortedTodos = [...todoList].sort((a, b) => {
      if (isAscending) {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    setTodoList(sortedTodos);
  };

  const removeTodo = async (id) => {
    const response = await api.removeTodo(tableName, id);
    if (response === id) {
      setTodoList((prevTodoList) =>
        prevTodoList.filter((todo) => todo.id !== id),
      );
    }
  };

  const addTodo = async (title) => {
    const response = await api.addTodo(tableName, title);
    if (response) {
      const todo = {
        id: response.id,
        title: response.fields.title,
        createdTime: response.createdTime,
      };
      setTodoList((prevTodoList) => [...prevTodoList, todo]);
    }
  };

  const handleChange = async (id, done) => {
    // setAreChecked((prevState) => ({
    //   ...prevState,
    //   [id]: !prevState[id],
    // }));
    // make API call to update checked value for id
    await checkTodo(id, done);
  };

  return (
    <div className={style.ListItem}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <TodoNavigation />
          <TodoListToggle updateSortOrder={toggleSortOrder} />
          <TodoList
            todoList={todoList}
            onRemoveTodo={removeTodo}
            areChecked={areChecked}
            handleChange={handleChange}
          />
          <AddTodoForm onAddTodo={addTodo} />
        </>
      )}
    </div>
  );
};

TodoContainer.propTypes = {
  tableName: PropTypes.string,
};

TodoContainer.defaultProps = {
  tableName: "Default",
};

export default TodoContainer;
