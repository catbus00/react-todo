import React, {useRef, useEffect} from 'react';

const InputWithLabel = ({
    id,
    value,
    type='text',
    onInputChange,
    children
    }) => {

    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    });
    
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