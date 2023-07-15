import React, {useState} from 'react'; 
import InputWithLabel from './InputWithLabel';

function AddTodoForm({onAddTodo}) {
    const [todoTitle, setTodoTitle] = useState('');
    
    function handleTitleChange(event) {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle)
    }
    function handleAddTodo(event) {
        event.preventDefault()

        const newTodo = {
            title: todoTitle,
            id: Date.now()
          };

        setTodoTitle('')
        onAddTodo(newTodo);

    }
    return (
        <form onSubmit = {handleAddTodo}>
            <InputWithLabel
                id="todoTitle"
                onInputChange={handleTitleChange}
                value={todoTitle}
                isFocused={true}
            >
                Title
            </InputWithLabel>

            <button type='submit'>Add</button>
        </form>
    );
}

export default AddTodoForm;