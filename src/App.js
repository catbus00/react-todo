import React, {useState, useEffect} from 'react';
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
        console.log('Response:', await response.text());
        throw new Error(message);
      }

      const data = await response.json();
      
      const todos = data.records.map((todo) => ({
        
          title: todo.fields.title,
          id: todo.id,
          order: index + 1, 
        }));

      setTodoList(todos);
      setIsLoading(false);

    } catch (error) {
      console.log(error.message)
    }
    
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    const savedTodoList = JSON.parse(localStorage.getItem('savedTodoList'));
    if (savedTodoList) {
      setTodoList(savedTodoList);
      setIsLoading(false);
    }
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
  
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const [selectedTodo, setSelectedTodo] = useState(null);

  function removeTodoItem(id) { 
    const removedItem = todoList.find(todo => todo.id === id);
    
    setSelectedTodo(removedItem);

    const updatedArray = todoList.filter(todo => todo.id !== id);
    setTodoList(updatedArray);

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
    .then(errorMessage => {
      if (errorMessage) {
        console.log('Delete Error Message:', errorMessage);
      } else {
        console.log('Delete Successful. ID:', id);
      }
    })
    .catch(error => {
      console.log(error.message);
    });
  
  }

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
    console.log('Updated Todo List:', todoList);
    postTodo(newTodo).then(dataResponse => {
      if(dataResponse) {
        newTodo.id = dataResponse.id;
        setTodoList([...todoList, newTodo])
      }
    })
  }
  
  return (
    <>
      {isLoading ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        <>
          <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            <TodoList todoList={todoList} removeTodo={removeTodoItem} />
        </>
        )
      }  
    </>
  );
}

export default App;