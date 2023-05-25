import React from 'react';

  const todoList = [
    { id: 1, title: "Complete assignment" },
    { id: 2, title: "Task 2" },
    { id: 3, title: "Task 3" }
  ];

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
