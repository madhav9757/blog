import React, { useId } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const InputLabel = styled.label`
  display: inline-block;
  margin-bottom: 6px;
  padding-left: 4px;
  font-size: 0.875rem; /* text-sm */
  font-weight: 500;
  color: #2D3748; /* dark gray for better contrast */
`;

const CustomInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  background-color: #fff;
  color: #1A202C;
  font-size: 0.95rem;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &::placeholder {
    color: #A0AEC0;
    font-size: 0.9rem;
  }

  &:focus {
    border-color: #3182CE; /* blue-600 */
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.3); /* subtle focus ring */
    background-color: #F7FAFC;
  }
`;

const ErrorMessage = styled.span`
  color: #E53E3E; /* red-600 */
  font-size: 0.75rem;
  margin-top: 4px;
  padding-left: 4px;
  display: block;
`;

const Input = React.forwardRef(function Input(
  { label, type = 'text', className = '', error = '', ...props },
  ref
) {
  const id = useId();

  return (
    <InputWrapper className={className}>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <CustomInput id={id} type={type} ref={ref} {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
});

export default Input;
