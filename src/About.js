import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe, updateMyName } from './actions';

const About = () => {
  const navigate = useNavigate();
  const [ me, updateMe ] = useState({
    click: false,
    name: '',
    email: ''
  })
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch()
  useEffect(()=>{
    // dispatch(getMe())
  },[])
  if(user === null||user==={}){
    navigate('/login')
  }
  const editName = (name) => {
    updateMe(prev=>{
      return {
        click:true,
        name: name,
        email: prev.email
      }
    })
  }
  console.log(me.name)
  const changeMyName = (e) => {
    updateMe(prev=>{
      return {
        click: prev.click, 
        name: e.target.value
      }
    })
  }
  const updateName = (name) => {
    dispatch(updateMyName(name, updateMe))
  }
  // if(user){
    // const {name, email, role} = user;

  if(!user){
    return <p>Loading...</p>
  }
  return(
    <div>
        <ul style = {{listStyle:'none', fontSize:'25px'}}>
          <li>Name:{me.click?<input style={{width: '100px'}} onChange={changeMyName} type = 'text' defaultValue={me.name}/>: user.name} <button onClick={me.click?()=>updateName(me.name):()=>editName(user.name)}>{me.click?'update':'eidt'}</button></li>
          <li>Email: {user.email}</li>
          <li>Role: {user.role}</li>
      </ul>
    </div>
)
}
export default About;