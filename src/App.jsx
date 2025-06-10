import React ,{ useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispacth = useDispatch() ; 

  useEffect( ()=> {
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispacth(login({userData}))
      } else {
        dispacth(logout())
      }
    }) 
    .finally(()=> setLoading(false))
  }, []) 

  return !loading ? (
    <div className="app-container">
 

    </div>
  ) : null 
}

export default App
