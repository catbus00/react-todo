import React, {useRef, useEffect} from 'react';

const InputWithLabel = ({
    id,
    value,
    type='text',
    onInputChange,
    isFocused,
    children
    }) => {
    const inputRef = useRef();
    useEffect(() => {
        console.log(isFocused);
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
      }, [isFocused]);
    
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input 
                ref={inputRef}
                id={id}
                type={type} 
                value={value}
                autoFocus
                onChange={onInputChange}
            />
        </>
    );
}
export default InputWithLabel;