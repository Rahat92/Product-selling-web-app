import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./actions";

const Register = () => {
  const [ display, setDisplay ] = useState(null)
  const dispatch = useDispatch()
  const { user, message } = useSelector(state=>state.user)
  
  useEffect(()=>{
    
  },[dispatch])
  const navigate = useNavigate()
  const registrationValue = (e) => {
    e.preventDefault()
    const name = e.target.name.value;
    const role = e.target.role.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;
    console.log(name, email, password, passwordConfirm)
    dispatch(registerUser( name, role, email, password, passwordConfirm,navigate ))
  }
  let dismiss;
    if(message){
      setTimeout(() => {
        setDisplay('none')
      }, 2000);
    }
  return (
    <div>
      <form onSubmit={registrationValue}>
        <input type= 'text' name="name" placeholder="Your name"/><br />
        <input type= 'text' name="role" placeholder="Your role"/><br />
        <input type= 'email' name="email" placeholder="Your email"/><br />
        <input type= 'password' name="password" placeholder="password"/><br />
        <input type= 'password' name="passwordConfirm" placeholder="password Confirm"/><br />
        <input type= 'submit' value= 'register'/>
      </form>
      {message?<div style={{display:display}}>{message.message}</div>:''}
    </div>
  )
}
export default Register;