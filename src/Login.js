import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getMe, loginUser } from './actions';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user)
  console.log(user)
  useEffect(()=>{
    dispatch(getMe())
  },[])
  
  const loginuser = (e) => {
    e.preventDefault()
      const email = e.target.email.value;
      const password = e.target.password.value;
    dispatch(loginUser(email, password, navigate))
  }
  if(user.user!==null&&user.isAuthenticated){
    navigate('/')
  }
  return(
    <div>
        <form onSubmit={loginuser}>
        Email
        <input type = 'email' name = 'email' /><br />
        password
        <input type = 'password' name = 'password'/>
        <input type = 'submit' value = 'Log in'/>
      </form>
    </div>
  )
}
export default Login;
