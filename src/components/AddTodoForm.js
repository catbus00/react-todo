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

    onAddTodo(todoTitle);
    setTodoTitle('');
  }

  return (
    <form onSubmit={handleAddTodo}>
      <div className="input-container">
        <InputWithLabel
          id="todoTitle"
          handleTitleChange={(event) => handleTitleChange(event)}
          todoTitle={todoTitle}
          isFocused
        >
          Title
        </InputWithLabel>
        <button type="submit" disabled={!todoTitle}>Add</button>
      </div>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
};

export default AddTodoForm;