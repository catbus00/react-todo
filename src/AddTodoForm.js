import React from 'react';

<input name = 'title' />
function AddTodoForm(props) {
    function handleAddTodo(event) {
        event.preventDefault()
        const todoTitle = event.target.elements.todoTitle.value
        console.log(todoTitle)
        event.target.reset();
        props.onAddTodo(todoTitle);

    }
    return (
        <form onSubmit = {handleAddTodo}>
            <label htmlFor='todoTitle'>Title</label>
            <input type='text' id='todoTitle'/>
            <button type='submit'>Add</button>
        </form>
    );
}

export default AddTodoForm;