import React, { useId } from 'react';
import styled from 'styled-components'; 

const SelectWrapper = styled.div`
    width: 100%; /* w-full */
    margin-bottom: 16px; /* Added for typical spacing between form elements */
`;

const SelectLabel = styled.label`
    display: block; /* Typically labels are block-level for select inputs */
    margin-bottom: 4px; /* mb-1 = 0.25rem = 4px */
    padding-left: 4px; /* pl-1 = 0.25rem = 4px (if you want the same spacing as Input) */
    font-size: 0.875rem; /* text-sm, common for labels */
    color: #4A5568; /* a common gray for labels */
`;

const CustomSelect = styled.select`
    /* px-3 py-2 */
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 8px;
    padding-bottom: 8px;

    border-radius: 8px;   /* rounded-lg */
    background-color: #FFFFFF; /* bg-white */
    color: #000000;       /* text-black */
    outline: none;        /* outline-none */

    /* focus:bg-gray-50 duration-200 */
    transition: background-color 200ms ease-in-out, border-color 200ms ease-in-out, box-shadow 200ms ease-in-out; /* duration-200 */
    border: 1px solid #E2E8F0; /* border border-gray-200 */
    width: 100%;          /* w-full */
    box-sizing: border-box; /* Ensure padding doesn't add to total width */

    /* Basic styling for dropdown arrow consistency */
    appearance: none; /* Remove default browser styling for the arrow */
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>');
    background-repeat: no-repeat;
    background-position: right 12px center; /* Position the custom arrow */
    background-size: 12px; /* Size the custom arrow */

    &:focus { /* Styled Components allows pseudo-classes directly */
        background-color: #F7FAFC;
        border-color: #CBD5E0;
        box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5); /* A subtle blue focus ring */
    }
`;

// --- React Component ---

function Select({
    options,
    label,
    className = "", // Provide a default empty string for className
    ...props
}, ref) {
    const id = useId();

    return (
        <SelectWrapper className={className}>
            {label && (
                <SelectLabel htmlFor={id}>
                    {label}
                </SelectLabel>
            )}
            <CustomSelect
                {...props}
                id={id}
                ref={ref}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </CustomSelect>
        </SelectWrapper>
    );
}

export default React.forwardRef(Select);