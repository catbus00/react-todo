import React, {useState, useEffect} from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem('savedTodoList')) || []
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const promiseFetchList = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: {todoList: JSON.parse(localStorage.getItem('savedTodoList')) || [] } });
      }, 2000);
    });

    promiseFetchList.then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    })
  }, [todoList]);  

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [isLoading, todoList])


  function removeTodo(id) {
    const updatedArray = todoList.filter(todo => todo.id !== id)
    setTodoList(updatedArray);
  }

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo])
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
            <TodoList todoList={todoList} removeTodo={removeTodo} />
        </>
        )
      }  
    </>
  );
}

export default App;