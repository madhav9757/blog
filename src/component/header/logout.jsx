import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import styled from 'styled-components'
import { FiLogOut } from 'react-icons/fi';

const LogoutB = styled.button`
    padding: 10px 16px;
  border-radius: 9999px;
  font-size: 0.95rem;
  font-weight: 500;
  background-color: transparent;
  color: #1e293b;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f0f9ff;
    color: #0369a1;
    border-color: #bae6fd;
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
        <LogoutB onClick={logoutHandler}>
            <FiLogOut style={{ marginRight: "8px", verticalAlign: "middle" }} />
            Logout
        </LogoutB>
    )
}

export default LogoutBtn