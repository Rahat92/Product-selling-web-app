import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const One = () => {
  // const { user,isAuthenticated, loading } = useSelector(state=>state.user)
  // console.log(window.location.pathname)
  // const navigate = useNavigate()
  // useEffect(()=>{
  // },[])
  
  return(
    <div>
      Hello world how are you
    </div>
  )
}
export default One