import React, { useState } from 'react'; 
import PropTypes from 'prop-types';
import style from './AddTodoForm.module.css'
import InputWithLabel from './InputWithLabel';
import addIcon from '../assets/add.svg';

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
          className="addButton"
        > 
          <div className="svg-container">
          <svg
            width="64px"
            height="64px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="your-svg-class"
          >
            <use xlinkHref="#myMask" fill="pink" />
          </svg>
          <img
            src={addIcon}
            className={style.addButton}
            alt='Add Todo Icon'
          />
      </div>
    </button>
    </div>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
};

export default AddTodoForm;
