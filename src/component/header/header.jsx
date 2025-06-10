import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

function Header() {

    const AppHeader = styled.header`
    padding-top: 12px;
    padding-bottom: 12px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    background-color: #6B7280;
`;

    const NavBar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

    const LogoWrapper = styled.div`
    margin-right: 16px;
    flex-shrink: 0;
`;

    const NavItemsList = styled.ul`
    display: flex;
    margin-left: auto;
    list-style: none;
    padding: 0;
    margin-top: 0;
    margin-bottom: 0;
`;

    const NavButton = styled.button`
    display: inline-block;
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 8px;
    padding-bottom: 8px;
    transition: background-color 200ms ease-in-out, color 200ms ease-in-out;
    border-radius: 9999px;
    background-color: transparent;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1.5;

    &:hover { /* Styled Components allows pseudo-classes directly */
        background-color: #DBEAFE;
        color: #1E40AF;
    }
`;


    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]


   
    return (
        <AppHeader>
            <Container>
                <NavBar>
                    <LogoWrapper>
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </LogoWrapper>
                    <NavItemsList>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <NavButton onClick={() => navigate(item.slug)}>
                                        {item.name}
                                    </NavButton>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </NavItemsList>
                </NavBar>
            </Container>
        </AppHeader>
    );
}

export default Header