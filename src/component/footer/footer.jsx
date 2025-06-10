import React from 'react';
import { Link } from 'react-router-dom'; 
import Logo from '../logo.jsx'; 

function Footer() {
   
    const footerSectionStyle = {
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '40px',
        paddingBottom: '40px',
        backgroundColor: '#A0AEC0',
        borderTop: '2px solid black',
    };

    const footerContainerStyle = {
        position: 'relative',
        zIndex: 10,
        maxWidth: '1280px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '16px',
        paddingRight: '16px',
    };

    const footerWrapStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '-24px',
    };

    const footerColBaseStyle = {
        padding: '24px',
        width: '100%',
    };

    const footerLogoContentStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    };

    const footerLogoWrapperStyle = {
        marginBottom: '16px',
        display: 'inline-flex',
        alignItems: 'center',
    };

    const footerCopyrightStyle = {
        fontSize: '0.875rem', 
        color: '#4A5568', 
    };

    const footerLinksGroupStyle = {
        height: '100%',
    };

    const footerHeadingStyle = {
        letterSpacing: '0.05em',
        marginBottom: '36px',
        fontSize: '0.75rem', 
        fontWeight: '600',
        textTransform: 'uppercase',
        color: '#718096', 
    };

    const footerLinkItemStyle = {
        marginBottom: '16px',
    };

    const footerLinkStyle = {
        fontSize: '1rem',
        fontWeight: '500',
        color: '#1A202C', 
        textDecoration: 'none',
        transition: 'color 0.2s ease-in-out',
    };

    return (
        <section style={footerSectionStyle}>
            <div style={footerContainerStyle}>
                <div style={footerWrapStyle}>
                    <div style={{ ...footerColBaseStyle, /* Responsive styles here are complex with inline styles */ }}>
                        <div style={footerLogoContentStyle}>
                            <div style={footerLogoWrapperStyle}>
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p style={footerCopyrightStyle}>
                                    &copy; Copyright 2023. All Rights Reserved by DevUI.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{ ...footerColBaseStyle, /* Responsive styles here */ }}>
                        <div style={footerLinksGroupStyle}>
                            <h3 style={footerHeadingStyle}>Company</h3>
                            <ul>
                                <li style={footerLinkItemStyle}>
                                    <Link style={footerLinkStyle} to="/">Features</Link>
                                </li>
                                <li style={footerLinkItemStyle}>
                                    <Link style={footerLinkStyle} to="/">Pricing</Link>
                                </li>
                                <li style={footerLinkItemStyle}>
                                    <Link style={footerLinkStyle} to="/">Affiliate Program</Link>
                                </li>
                                <li style={{ ...footerLinkItemStyle, marginBottom: 0 }}>
                                    <Link style={footerLinkStyle} to="/">Press Kit</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ ...footerColBaseStyle, /* Responsive styles here */ }}>
                        <div style={footerLinksGroupStyle}>
                            <h3 style={footerHeadingStyle}>Support</h3>
                            <ul>
                                <li style={footerLinkItemStyle}>
                                    <Link style={footerLinkStyle} to="/">Account</Link>
                                </li>
                                <li style={footerLinkItemStyle}>
                                    <Link style={footerLinkStyle} to="/">Help</Link>
                                </li>
                                <li style={footerLinkItemStyle}>
                                    <Link style={footerLinkStyle} to="/">Contact Us</Link>
                                </li>
                                <li style={{ ...footerLinkItemStyle, marginBottom: 0 }}>
                                    <Link style={footerLinkStyle} to="/">Customer Support</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ ...footerColBaseStyle, /* Responsive styles here */ }}>
                        <div style={footerLinksGroupStyle}>
                            <h3 style={footerHeadingStyle}>Legals</h3>
                            <ul>
                                <li style={footerLinkItemStyle}>
                                    <Link style={footerLinkStyle} to="/">Terms &amp; Conditions</Link>
                                </li>
                                <li style={footerLinkItemStyle}>
                                    <Link style={footerLinkStyle} to="/">Privacy Policy</Link>
                                </li>
                                <li style={{ ...footerLinkItemStyle, marginBottom: 0 }}>
                                    <Link style={footerLinkStyle} to="/">Licensing</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;