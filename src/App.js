import React, {useState, useEffect} from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAndSortTodos = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
      }
    };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
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
    }))

    const sortedTodos = todos.sort((a, b) => {
        if (a.createdTime > b.createdTime) {
            return 1;
        } else if (a.createdTime < b.createdTime) {
            return -1;
        } else {
            return 0;
        }
    });

      setTodoList(sortedTodos);
      setIsLoading(false);
    };

    useEffect(() => {
      fetchAndSortTodos();
    }, []);
    
  const postTodo = async (todo) => {
    const newTodo = {
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
      body: JSON.stringify(newTodo),
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

 const removeTodo = async (id) => { 
  const deleteUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${id}`;
  const deleteOptions = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
    },
  };
  try {
  const response = await fetch(deleteUrl, deleteOptions)
    if (!response.ok) {
      throw new Error(`Error deleting todo: ${response.status}`);
    } 
    setTodoList(prevTodoList => prevTodoList.filter(todo => todo.id !== id));
    } catch (error) {
      console.log('Delete Error:', error.message);
    };
  };

  const addTodo = async (newTodo) => {
    const dataResponse = await postTodo(newTodo);
    if (dataResponse) {
      newTodo.id = dataResponse.id;
      setTodoList([...todoList, newTodo])
      }
    }

  return (
    <>
      <h1>Todo List</h1>
      {isLoading ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        <>
            <AddTodoForm onAddTodo={addTodo} />
            <TodoList todoList={todoList} removeTodo={removeTodo} />
        </>
        )
      }  
    </>
  );
}

export default App;