import React, { useState, useEffect, useCallback } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import TodoListToggle from './TodoListToggle';
import api from './Api';
import style from './App.css';
import PropTypes from 'prop-types';

const TodoContainer = ({ tableName }) => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkedState, setCheckedState] = useState({});
  const [isAscending, setIsAscending] = useState(true);

  const fetchAndSortTodos = useCallback(async () => {
    const sortField = 'title'; 
    const sortOptions = `sort[0][field]=${sortField}&sort[0][direction]=asc`;

    const sortedTodos = await api.fetchAndSortTodos(tableName, sortOptions);

    setTodoList(sortedTodos);
    setIsLoading(false);
  }, [tableName]);

  useEffect(() => {
    fetchAndSortTodos();
  }, [fetchAndSortTodos]);

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);

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
      setTodoList((prevTodoList) => prevTodoList.filter((todo) => todo.id !== id));
    }
  };

  const addTodo = async (title) => {
    const response = await api.addTodo(tableName, title);
    if (response !== undefined) {
      const todo = {
        id: response.id,
        title: response.fields.title,
        createdTime: response.createdTime,
      };
      setTodoList([...todoList, todo]);
    }
  };

  const handleChange = (id) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className={style.ListItem}>
      <h1><b>{tableName}</b></h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>

          <TodoListToggle updateSortOrder={toggleSortOrder} />


          <TodoList
            todoList={todoList}
            onRemoveTodo={removeTodo}
            isChecked={checkedState}
            handleChange={handleChange}
          />
          <AddTodoForm onAddTodo={addTodo} />
        </>
      )}
    </div>
  );
}

TodoContainer.propTypes = {
  tableName: PropTypes.string
};

TodoContainer.defaultProps = {
  tableName: 'Default'
};

export default TodoContainer;