import React from 'react';

function Container({ children }) {
  const containerStyles = {
    width: '100%',             // Equivalent to Tailwind's 'w-full'
    maxWidth: '1280px',        // Equivalent to Tailwind's 'max-w-7xl'
    marginLeft: 'auto',        // Equivalent to Tailwind's 'mx-auto'
    paddingLeft: '16px',       // Equivalent to Tailwind's 'px-4'
    paddingRight: '16px',      // Equivalent to Tailwind's 'px-4'
  };

  return <div style={containerStyles}>{children}</div>;
}

export default Container;