import React, { useState, useEffect, useCallback } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import TodoListToggle from './TodoListToggle';
import api from './Api';
import style from './App.css';

function TodoContainer() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkedState, setCheckedState] = useState({});
  const [isAscending, setIsAscending] = useState(true);

  const baseUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}?`;

  const fetchAndSortTodos = useCallback(async () => {
    const sortField = 'title'; 
    const sortDirection = isAscending ? 'asc' : 'desc';
    const sortOptions = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    const url = `${baseUrl}&${sortOptions}`;
    const sortedTodos = await api.fetchAndSortTodos(url);

    setTodoList(sortedTodos);
    setIsLoading(false);
  }, [isAscending, baseUrl]);

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
    const response = await api.removeTodo(id);
    if (response === id) {
      setTodoList((prevTodoList) => prevTodoList.filter((todo) => todo.id !== id));
    }
  };

  const addTodo = async (newTodo) => {
    const id = await api.addTodo(newTodo);
    if (id !== undefined) {
      const todo = newTodo;
      todo.id = id;
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
      <h1><b>TASK LIST</b></h1>
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

export default TodoContainer;