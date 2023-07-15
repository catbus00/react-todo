import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({todoList, removeTodo}) {

  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} removeTodo={removeTodo}/>
      ))}
    </ul>
  );
}


export default TodoList;
