import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function InputWithLabel({
  id,
  value,
  type = 'text',
  onInputChange,
  children,
}) {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  InputWithLabel.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    onInputChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };
  

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
}
export default InputWithLabel;
