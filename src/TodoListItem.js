import React from 'react';

function TodoListItem({todo}) {
    return(
        <li>
            {todo.title}
            <button>Remove</button>
        </li>

    );
}

export default TodoListItem;