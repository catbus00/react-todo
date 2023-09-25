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

  return (
    <BrowserRouter>
      <Routes>
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

