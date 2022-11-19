import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getMe, loginUser } from './actions';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, message } = useSelector(state=>state.user)
  const [ display, setDisplay ] = useState(null)
  console.log(user)
  let setDisplayTime;
  useEffect(()=>{
    
  },[])
  if(message){
    setDisplayTime = setTimeout(()=>{
      setDisplay('none')
    },5000)
  }
  const loginuser = (e) => {
    e.preventDefault()
      const email = e.target.email.value;
      const password = e.target.password.value;
    dispatch(loginUser(email, password, navigate))
    setDisplay(null)
    clearTimeout(setDisplayTime)
  }
  if(user!==null&&isAuthenticated){
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
      Not an account? <Link to = "/register">Register</Link>
      <p style={{color:'red', display:display}}>{message?message.message:''}</p>
    </div>
  )
}
export default Login;
