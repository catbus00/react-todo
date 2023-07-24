import React, {useState, useEffect} from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem('savedTodoList')) || []
  );

  useEffect(() => {
    const promise1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: {todoList: JSON.parse(localStorage.getItem('savedTodoList')) || [] } });
      }, 2000);
    });

    promise1.then((result) => {
      setTodoList(result.data.todoList);
    })
  }, [todoList]);
  

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList])

  function removeTodo(id) {
    const updatedArray = todoList.filter(todo => todo.id !== id)
    setTodoList(updatedArray);
  }

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo])
  }
  return (
    <>
      <h1>Todo List</h1>
        <AddTodoForm onAddTodo={addTodo} />
        <TodoList todoList={todoList} removeTodo={removeTodo} />
    </>
  );
}

export default App;