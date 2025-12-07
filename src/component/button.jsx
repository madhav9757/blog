import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: ${props => props.$size === 'small' ? '8px 16px' : props.$size === 'large' ? '14px 32px' : '10px 24px'};
  border-radius: 8px;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: ${props => props.$size === 'small' ? '0.875rem' : props.$size === 'large' ? '1.125rem' : '1rem'};
  font-weight: 600;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${props => props.disabled ? 0.5 : 1};
  white-space: nowrap;
  
  /* Color variants */
  ${props => {
    if (props.$variant === 'outline') {
      return `
        background: transparent;
        border: 2px solid ${getColor(props.$bgColor)};
        color: ${getColor(props.$bgColor)};
        
        &:hover:not(:disabled) {
          background: ${getColor(props.$bgColor)};
          color: white;
        }
      `;
    }
    
    if (props.$variant === 'ghost') {
      return `
        background: transparent;
        color: ${getColor(props.$bgColor)};
        
        &:hover:not(:disabled) {
          background: ${getHoverColor(props.$bgColor, true)};
        }
      `;
    }
    
    // Default solid variant
    return `
      background: ${getColor(props.$bgColor)};
      color: ${props.$textColor === 'dark' ? '#1e293b' : 'white'};
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      
      &:hover:not(:disabled) {
        background: ${getHoverColor(props.$bgColor)};
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      &:active:not(:disabled) {
        transform: translateY(0);
      }
    `;
  }}
`;

// Helper function to get color values
const getColor = (bgColor) => {
  const colorMap = {
    "blue-600": "#2563EB",
    "blue-500": "#3B82F6",
    "red-500": "#EF4444",
    "red-600": "#DC2626",
    "green-500": "#22C55E",
    "green-600": "#16A34A",
    "gray-500": "#6B7280",
    "gray-600": "#4B5563",
    "purple-600": "#9333EA",
    "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  };
  return colorMap[bgColor] || colorMap["blue-600"];
};

// Helper function to get hover color
const getHoverColor = (bgColor, isGhost = false) => {
  if (bgColor === 'gradient') {
    return 'linear-gradient(135deg, #5568d3 0%, #6a4391 100%)';
  }
  
  const hoverMap = {
    "blue-600": isGhost ? "#EFF6FF" : "#1D4ED8",
    "blue-500": isGhost ? "#EFF6FF" : "#2563EB",
    "red-500": isGhost ? "#FEF2F2" : "#DC2626",
    "red-600": isGhost ? "#FEF2F2" : "#B91C1C",
    "green-500": isGhost ? "#F0FDF4" : "#16A34A",
    "green-600": isGhost ? "#F0FDF4" : "#15803D",
    "gray-500": isGhost ? "#F9FAFB" : "#4B5563",
    "gray-600": isGhost ? "#F9FAFB" : "#374151",
    "purple-600": isGhost ? "#FAF5FF" : "#7C3AED",
  };
  return hoverMap[bgColor] || hoverMap["blue-600"];
};

export default function Button({
  children,
  type = "button",
  bgColor = "blue-600",
  textColor = "white",
  size = "medium",
  variant = "solid",
  className = "",
  disabled = false,
  icon = null,
  ...props
}) {
  return (
    <StyledButton
      type={type}
      disabled={disabled}
      $bgColor={bgColor}
      $textColor={textColor}
      $size={size}
      $variant={variant}
      className={className}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </StyledButton>
  );
}
