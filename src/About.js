import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from './actions';
import Modal from './Modal';

const About = () => {
  const [ click, setClick ] = useState(false)
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getMe())
  },[])
  if(user === null||user==={}){
    navigate('/login')
  }
  // if(user){
    // const {name, email, role} = user;

  if(!user){
    return <p>Loading...</p>
  }
  return(
    <div>
        <ul style = {{listStyle:'none', fontSize:'25px'}}>
        <li>Name:{user.name}</li>
        <li>Email: {user.email}</li>
        <li>Role: {user.role}</li>
      </ul>
    </div>
)
}
export default About;