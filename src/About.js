import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from './actions';
import Modal from './Modal';

const About = () => {
  const [ click, setClick ] = useState(false)
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  console.log(user)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getMe())
    // setClick(true)
  },[])
  // const onPush = (click) => {
  //   if(click){
  //     setClick(false)
  //   }
  // }
  const clickEffect = () => {
    setClick(true)
  }
  if(user === null||user==={}){
    navigate('/login')
  }
  if(user){
    const {name, email, role} = user;
  
    return(
        <div>
          {/* {click&&<Modal onPush = {onPush}/>} */}
          {click&&<Modal state = {setClick} click = {click}/>}
          <ul style = {{listStyle:'none', fontSize:'25px'}}>
            <li onClick={clickEffect}>Name: {name}</li>
            <li>Email: {email}</li>
            <li>Role: {role}</li>
          </ul>
        </div>
    )
  }
  }
export default About;