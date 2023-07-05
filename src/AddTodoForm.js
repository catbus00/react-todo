import React, {useState} from 'react';

<input name = 'title' />
function AddTodoForm({onAddTodo}) {
    const [todoTitle, setTodoTitle] = useState('');
    function handleTitleChange(event) {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle)
    }
    function handleAddTodo(event) {
        const newObjectTitle = {
            title: todoTitle,
            id: Date.now()
          };

        event.preventDefault()
        console.log(todoTitle)
        setTodoTitle('')
        onAddTodo(newObjectTitle);

    }
    return (
        <form onSubmit = {handleAddTodo}>
            <label htmlFor='todoTitle'>Title</label>
            <input 
                type='text' 
                id='todoTitle'
                value={todoTitle}
                onChange={handleTitleChange}
            />
            <button type='submit'>Add</button>
        </form>
    );
}

export default AddTodoForm;