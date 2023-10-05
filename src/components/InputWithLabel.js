import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const InputWithLabel = ({
  id,
  todoTitle,
  type = "text",
  handleTitleChange,
}) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={todoTitle}
        onChange={handleTitleChange}
      />
    </>
  );
};
InputWithLabel.propTypes = {
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
};
export default InputWithLabel;
