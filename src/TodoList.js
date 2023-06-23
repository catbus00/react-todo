import React from 'react';
import TodoListItem from './TodoListItem';

const todoList = [
  { id: 1, title: "Read Road To React" },
  { id: 2, title: "Watch Videos" },
  { id: 3, title: "Complete Assignment" }
];

function TodoList() {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
