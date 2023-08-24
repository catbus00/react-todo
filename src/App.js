import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
    const fetchData = async() => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
        }
      };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      
      const todos = data.records.map((todo) => ({
        
          title: todo.fields.title,
          id: todo.id,
          createdTime: todo.createdTime,
        }));

      const sortedTodos = todos.sort((a, b) =>
      a.createdTime > b.createdTime ? 1 : a.createdTime < b.createdTime ? -1 : 0
      );       
      setTodoList(sortedTodos);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message)
    }
    
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const postTodo = async (todo) => {
    const postTodos = {
      fields: {
        title: todo.title,
      },
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
      body: JSON.stringify(postTodos),
    };
  
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`;
  
    try{
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error has occurred: ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();
      return dataResponse;

    } catch (error) {
      console.log(error.message)
      return null;
    }
};

  function removeTodoItem(id) { 
  const deleteUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${id}`;
  const deleteOptions = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
    },
  };

  fetch(deleteUrl, deleteOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error deleting todo: ${response.status}`);
      } 
    })
    .then(() => {
      setTodoList(prevTodoList => prevTodoList.filter(todo => todo.id !== id));
    })
    .catch(error => {
      console.log('Delete Error:', error.message);
    });
  
  }

  function addTodo(newTodo) {
    postTodo(newTodo).then(dataResponse => {
      if(dataResponse) {
        newTodo.id = dataResponse.id;
        setTodoList([...todoList, newTodo])
      }
    })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/new" element = {<h1>New Todo List</h1>} />
        <Route 
          path="/" 
          element = 
            {isLoading ? (
              <>
                <p>Loading...</p>
              </>
            ) : (
              <>
                <h1>Todo List</h1>
                  <AddTodoForm 
                    onAddTodo={addTodo} 
                  />
                  <TodoList 
                    todoList={todoList} 
                    removeTodo={removeTodoItem} 
                  />
              </>
              )
            }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;