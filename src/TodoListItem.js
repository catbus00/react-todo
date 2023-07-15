import React from 'react';

function TodoListItem({todo, removeTodo}) {
    const onRemoveClick = () => {
        removeTodo(todo.id);
      };

    return(
        <li>
            {todo.title}
            <button onClick={onRemoveClick}>Remove</button>
        </li>

    );
}

export default TodoListItem;