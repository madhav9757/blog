import React, { useId } from 'react';
import styled from 'styled-components';

const SelectWrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const SelectLabel = styled.label`
  display: block;
  margin-bottom: 6px;
  padding-left: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #2D3748;
`;

const CustomSelect = styled.select`
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
  background-color: #FFFFFF;
  color: #1A202C;
  font-size: 0.95rem;
  appearance: none;
  outline: none;
  box-sizing: border-box;

  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' stroke='%23343A40' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;

  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    background-color: #F7FAFC;
    border-color: #3182CE;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.3);
  }
`;

const Select = React.forwardRef(function Select(
  { options = [], label, className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <SelectWrapper className={className}>
      {label && <SelectLabel htmlFor={id}>{label}</SelectLabel>}
      <CustomSelect id={id} ref={ref} {...props}>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </CustomSelect>
    </SelectWrapper>
  );
});

export default Select;