import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const AppHeader = styled.header`
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LogoWrapper = styled.div`
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
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.9375rem;
  font-weight: 500;
  background-color: ${(props) => (props.$active ? '#000' : 'transparent')};
  color: ${(props) => (props.$active ? '#fff' : '#666')};
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    color: ${(props) => (props.$active ? '#fff' : '#000')};
  }
`;

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Sign up', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'New Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <AppHeader>
      <Container>
        <NavBar>
          <LogoWrapper>
            <Link to="/">
              <Logo />
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
