import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import style from './components/App.module.css';
import './components/App.css';
import api from './components/Api';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkedState, setCheckedState] = useState({});

  const fetchAndSortTodos = async () => {
    const sortedTodos = await api.fetchAndSortTodos();

    setTodoList(sortedTodos);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAndSortTodos();
  }, []);

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

  // http://my.domain.com // landing page // App.js
  // http://my.domain.com/todos // displaying all the todos // TodoList.js (show all state)

  // http://my.domain.com/todo // specific todo (any state for specific todo)
  // http://my.domain.com/todo/1234 // any operation with specific todo e.g. with ID 1234 (default to show specific todo)
  // or
  // http://my.domain.com/todo/new // creating new todo (display specific one state)
  // http://my.domain.com/todo/show/1234 // displaying todo with ID 1234 (display specific one state)
  // http://my.domain.com/todo/edit/1234 // editing todo with ID 1234 (display specific one state)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todo" element={<h1>New Todo List</h1>} />
        <Route path="/todo" element={<h1>New Todo List</h1>} />
        <Route
          path="/"
          element={(
            <div className={style.ListItem}>
              <h1><b>TASK LIST</b></h1>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <TodoList
                    todoList={todoList}
                    removeTodo={removeTodo}
                    isChecked={checkedState}
                    handleChange={handleChange}
                  />
                  <AddTodoForm
                    onAddTodo={addTodo}
                  />
                </>
              )}
            </div>
        )}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
