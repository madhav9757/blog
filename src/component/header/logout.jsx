import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import styled from 'styled-components'

const LogoutButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.9375rem;
  font-weight: 500;
  background-color: transparent;
  color: #666;
  border: none;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: #000;
  }
`;

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <LogoutButton onClick={logoutHandler}>
            Log out
        </LogoutButton>
    )
}

export default LogoutBtn
