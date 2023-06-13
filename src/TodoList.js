import * as React from 'react';

const todoList = [
    { id: 1, title: "Read Road To React" },
    { id: 2, title: "Watch Videos" },
    { id: 3, title: "Complete Assignment" }
  ];

function TodoList() {
    return (
        <ul>
            {todoList.map((todo) => (
                <li key={todo.id}>{todo.title}</li>
            ))}
      </ul>
    );
}

export default TodoList;