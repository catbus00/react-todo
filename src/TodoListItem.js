import React from 'react';

function TodoListItem({todo, onClick}) {
    return(
        <li>
            {todo.title}
            <button onClick={onClick}>Remove</button>
        </li>

    );
}

export default TodoListItem;