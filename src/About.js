import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe, updateMyName } from './actions';

const About = () => {
  const navigate = useNavigate();
  const [ me, updateMe ] = useState({
    click: false,
    type: '',
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
  const editMyData = (data, type) => {
    updateMe(prev=>{
      return {
        click:true,
        type: type,
        name: type === 'name'? data:prev.name,
        email: type === 'email'? data:prev.email
      }
    })
  }
  console.log(me.name)
  const changeMyData = (e, type) => {
    updateMe(prev=>{
      return {
        click: true,
        type: type, 
        name: type === 'name'?e.target.value:prev.name,
        email: type === 'email'?e.target.value:prev.email
      }
    })
  }
  const updateMyData = (data, type) => {
    dispatch(updateMyName(data, type, updateMe))
  }
  // if(user){
    // const {name, email, role} = user;

  if(!user){
    return <p>Loading...</p>
  }
  return(
    <div>
        <ul style = {{listStyle:'none', fontSize:'25px'}}>
          <li>Name:{me.click&&me.type === 'name'?<input style={{width: '100px'}} onChange={(e)=>changeMyData(e,'name')} type = 'text' defaultValue={me.name}/>: user.name} <button onClick={me.click&&me.type === 'name'?()=>updateMyData(me.name, 'name'):()=>editMyData(user.name,'name')}>{me.click&&me.type === 'name'?'update':'edit'}</button></li>
          <li>Email:{me.click&&me.type === 'email'?<input style={{width: '100px'}} onChange={(e)=>changeMyData(e,'email')} type = 'text' defaultValue={me.email}/>: user.email} <button onClick={me.click&&me.type === 'email'?()=>updateMyData(me.email, 'email'):()=>editMyData(user.email,'email')}>{me.click&&me.type === 'email'?'update':'edit'}</button></li>
          <li>Role: {user.role}</li>
      </ul>
    </div>
)
}
export default About;