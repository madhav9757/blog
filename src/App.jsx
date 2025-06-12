import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from './component'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        if (error.message !== 'User (role: guests) missing scope (account)') {
          console.error("Appwrite service :: getCurrentUser :: unexpected error :: ", error);
        } else {
        }
        dispatch(logout()); 
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div>
      <header />
      <main>
        TODO:  <Outlet />
      </main>
      <footer />
    </div>
  ) : null
}

export default App
