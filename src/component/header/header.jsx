import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// Styled Components
const AppHeader = styled.header`
  padding: 12px 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
  background-color: #1f2937; // dark gray
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
  margin: 0;
  gap: 8px;
`;

const NavButton = styled.button`
  display: inline-block;
  padding: 8px 20px;
  border-radius: 9999px;
  font-size: 1rem;
  line-height: 1.5;
  background-color: transparent;
  color: ${(props) => (props.$active ? '#60a5fa' : '#f8fafc')};
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  border: none;
  cursor: pointer;
  transition: background-color 200ms ease, color 200ms ease;

  &:hover {
    background-color: #dbeafe;
    color: #1e40af;
  }
`;

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation(); // 🔍 current route

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <AppHeader>
      <Container>
        <NavBar>
          <LogoWrapper>
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </LogoWrapper>
          <NavItemsList>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavButton
                    $active={location.pathname === item.slug}
                    onClick={() => navigate(item.slug)}
                  >
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

export default Header;
