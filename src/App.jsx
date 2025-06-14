import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from './component'
import { Toaster } from "react-hot-toast";

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log("User Data:", userData);
          dispatch(login({ userData }));
        } else {
          console.log("No user data, dispatching logout.");
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
    <div className='app-wrapper'> {/* <--- Using a custom class name */}
      <Toaster position="top-right" reverseOrder={false} />
      <div className='content-wrapper'> {/* <--- Using a custom class name */}
        <Header />
        <main className="main-content">
          {/* TODO: Add proper styling for the main content area if needed */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
