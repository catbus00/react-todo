import React, { useState } from 'react'; 
import PropTypes from 'prop-types';
import style from './AddTodoForm.module.css'
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
        </InputWithLabel>
        <button 
          type="submit" 
          disabled={!todoTitle}
          className="add-button-container"
        > 
          <svg className={style.addButton} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z" />
          </svg>
        </button>
      </div>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
};

export default AddTodoForm;
