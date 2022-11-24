import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe, updateMyName } from './actions';

const About = () => {
  const [ display, setDisplay ] = useState(null)
  const navigate = useNavigate();
  const [ me, updateMe ] = useState({
    click: false,
    type: '',
    name: '',
    email: ''
  })
  const { user, message } = useSelector(state => state.user);
  const [ msg, setMsg] = useState(false)
  const dispatch = useDispatch()
  useEffect(()=>{
    let dismiss;
    if(message&&msg){
      console.log(msg, message)
      dismiss = setTimeout(() => {
        return setDisplay('none')
      }, 5000);
    }
    return () => clearTimeout(dismiss)
  },[msg,message])
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
    setDisplay('block')  
    dispatch(updateMyName(data, type, updateMe, setMsg))
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
          <li>Email:{me.click && me.type === 'email'?<input style={{width: '100px'}} onChange={(e)=>changeMyData(e,'email')} type = 'text' defaultValue={me.email}/>: user.email} <button onClick={me.click&&me.type === 'email'?()=>updateMyData(me.email, 'email'):()=>editMyData(user.email,'email')}>{me.click&&me.type === 'email'?'update':'edit'}</button></li>
            {me.type === 'email'&& message&&message.message.includes('E11000')?<h3 style={{color:'red', margin: '0', padding: '0', display: display }}>duplicate field error</h3>:''}
          <li>Role: {user.role}</li>
      </ul>
    </div>
)
}
export default About;