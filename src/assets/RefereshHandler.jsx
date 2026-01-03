import React, { useEffect } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom'

const RefereshHandler = ({setIsAuthenticated}) => {
const location=useLocation();
const navigation=useNavigate();
useEffect(() => {
  if(localStorage.getItem("token")){
    setIsAuthenticated(true);
    if(location.pathname==='/'){
        navigation("/editor",{replace:false})
    }
  }
}, [location,navigation,setIsAuthenticated])

  return null
}

export default RefereshHandler
