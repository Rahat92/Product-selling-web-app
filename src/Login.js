import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getMe, loginUser } from './actions';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ msg, setMmsg ] = useState(false)
  const { isAuthenticated, user, loading, message } = useSelector(state=>state.user)
  const [ display, setDisplay ] = useState(null)
  console.log(user)
  let setDisplayTime;
  useEffect(()=>{
    if(message&&msg){
      setDisplayTime = setTimeout(()=>{
        return setDisplay('none')
      },2000)
    }
    return ()=>clearTimeout(setDisplayTime)
  },[message])
  
  const loginuser = (e) => {
    e.preventDefault()
    setDisplay(null)
      const email = e.target.email.value;
      const password = e.target.password.value;
    dispatch(loginUser(email, password, navigate, setMmsg))
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
      <p style={{color:'red', display:display}}>{msg&&message&&message.message}</p>
    </div>
  )
}
export default Login;
