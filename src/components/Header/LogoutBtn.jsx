import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {logout} from '../../store/authSlice'
import authservice from '../../appwrite/authService'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
    const dispatch=useDispatch()
    const navigate=useNavigate()    
     const logoutHandler=()=>{
       navigate('/login')
        authservice.logout()
        .then(()=>{dispatch(logout())})
        
        
    }
  return (
    <button
    onClick={logoutHandler}
     className='inline-bock px-3 py-2 ml-1.5 duration-200 hover:bg-blue-500 bg-blue-600 text-white rounded-md  ' >Log out</button>
  )
}

export default LogoutBtn