import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import styled from 'styled-components'

const LogoutB = styled.button`
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

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <LogoutB onClick={()=>logoutHandler()}>
            LOGOUT
        </LogoutB>
    )
}

export default LogoutBtn