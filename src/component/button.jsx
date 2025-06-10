import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "blue-600", // Keep string names for easier mapping here
    textColor = "white",
    className = "",
    ...props
}) {
    // Define base button styles
    const baseButtonStyles = {
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '8px',
        paddingBottom: '8px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        lineHeight: '1.5',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
    };

    // Define color mappings
    const colorMap = {
        "blue-600": "#2563EB",
        "red-500": "#EF4444",
        "green-500": "#22C55E",
    };

    const textColorMap = {
        "white": "#FFFFFF",
        "gray-800": "#1F2937",
    };

    const computedBgColor = colorMap[bgColor] || colorMap["blue-600"]; 
    const computedTextColor = textColorMap[textColor] || textColorMap["white"]; 

    const mergedStyles = {
        ...baseButtonStyles,
        backgroundColor: computedBgColor,
        color: computedTextColor,
    };

    return (
        <button
            type={type}
            style={mergedStyles}
            className={className} 
            {...props}
        >
            {children}
        </button>
    );
}