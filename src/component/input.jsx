import React, { useId } from 'react';
import styled from 'styled-components'; 


const InputWrapper = styled.div`
    width: 100%;
    margin-bottom: 16px; /* Added for typical spacing between form inputs */
`;

const InputLabel = styled.label`
    display: inline-block;
    margin-bottom: 4px;
    padding-left: 4px;
    font-size: 0.875rem; /* text-sm */
    color: #4A5568; /* a common gray for labels */
`;

const CustomInput = styled.input`
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 8px;
    background-color: #FFFFFF;
    color: #000000;
    outline: none;
    transition: background-color 200ms ease-in-out, border-color 200ms ease-in-out;
    border: 1px solid #E2E8F0;
    width: 100%;
    box-sizing: border-box;

    &:focus { /* Styled Components allows pseudo-classes directly */
        background-color: #F7FAFC;
        border-color: #CBD5E0;
    }
`;

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "", 
    ...props
}, ref) {
    const id = useId();

    return (
        <InputWrapper className={className}> {/* Apply external className to wrapper */}
            {label && (
                <InputLabel htmlFor={id}>
                    {label}
                </InputLabel>
            )}
            <CustomInput
                type={type}
                ref={ref}
                {...props}
                id={id}
            />
        </InputWrapper>
    );
});

export default Input;