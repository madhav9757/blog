import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "blue-600",
  textColor = "white",
  className = "",
  disabled = false,
  ...props
}) {
  const baseButtonStyles = {
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingTop: "10px",
    paddingBottom: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "1rem",
    lineHeight: "1.5",
    fontWeight: 600,
    textAlign: "center",
    display: "inline-block",
    transition: "all 0.2s ease-in-out",
    opacity: disabled ? 0.6 : 1,
  };

  const colorMap = {
    "blue-600": "#2563EB",
    "red-500": "#EF4444",
    "green-500": "#22C55E",
  };

  const hoverMap = {
    "blue-600": "#1D4ED8", // hover: blue-700
    "red-500": "#DC2626",  // hover: red-600
    "green-500": "#16A34A", // hover: green-600
  };

  const textColorMap = {
    white: "#FFFFFF",
    "gray-800": "#1F2937",
  };

  const computedBgColor = colorMap[bgColor] || colorMap["blue-600"];
  const computedTextColor = textColorMap[textColor] || textColorMap["white"];
  const computedHoverColor = hoverMap[bgColor] || hoverMap["blue-600"];

  const [hovered, setHovered] = React.useState(false);

  const mergedStyles = {
    ...baseButtonStyles,
    backgroundColor: hovered ? computedHoverColor : computedBgColor,
    color: computedTextColor,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      style={mergedStyles}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
}
