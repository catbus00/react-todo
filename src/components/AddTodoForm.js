import React, { useState } from 'react'; 
import PropTypes from 'prop-types';
import InputWithLabel from './InputWithLabel';

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };
  function handleAddTodo(event) {
    event.preventDefault();
    const newTodo = {
      title: todoTitle,
      id: '',
      createdTime: new Date().toISOString(),
    };

    event.preventDefault();

    setTodoTitle('');
    onAddTodo(newTodo);
  }

  return (
    <form onSubmit={handleAddTodo}>
      <div className="input-container">
        <InputWithLabel
          id="todoTitle"
          onInputChange={(event) => handleTitleChange(event)}
          value={todoTitle}
          isFocused
        >
          Title
        </InputWithLabel>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;