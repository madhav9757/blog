import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div>
          <h2 style={logoStyle}>LOGO</h2>
          <p style={copyrightStyle}>© 2023 DevUI. All rights reserved.</p>
        </div>

        <div>
          <h4 style={titleStyle}>Company</h4>
          <a style={linkStyle} href="#">Features</a>
          <a style={linkStyle} href="#">Pricing</a>
          <a style={linkStyle} href="#">Affiliate</a>
          <a style={linkStyle} href="#">Press Kit</a>
        </div>

        <div>
          <h4 style={titleStyle}>Support</h4>
          <a style={linkStyle} href="#">Help</a>
          <a style={linkStyle} href="#">Contact</a>
          <a style={linkStyle} href="#">Account</a>
        </div>

        <div>
          <h4 style={titleStyle}>Legal</h4>
          <a style={linkStyle} href="#">Privacy</a>
          <a style={linkStyle} href="#">Terms</a>
          <a style={linkStyle} href="#">License</a>
        </div>
      </div>
    </footer>
  );
}

// Inline CSS styles
const footerStyle = {
  backgroundColor: '#1A202C',
  color: '#E2E8F0',
  padding: '40px 20px',
  marginTop: 'auto', // This is key for pushing footer to bottom!
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '30px',
};

const logoStyle = {
  marginBottom: '10px',
};

const titleStyle = {
  fontSize: '1rem',
  color: '#A0AEC0',
  marginBottom: '12px',
};

const linkStyle = {
  display: 'block',
  color: '#E2E8F0',
  textDecoration: 'none',
  fontSize: '0.9rem',
  marginBottom: '8px',
};

const copyrightStyle = {
  fontSize: '0.8rem',
  marginTop: '10px',
  color: '#A0AEC0',
};

export default Footer;
