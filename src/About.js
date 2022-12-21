import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMe, updateCurrentUserData } from './actions';

const About = () => {
  const [ display, setDisplay ] = useState(null)
  const navigate = useNavigate();
  const [ me, updateMe ] = useState({
    click: false,
    type: '',
    name: '',
    photo:'',
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
  // if(user === null||user==={}){
  //   navigate('/login')
  // }
  const editMyData = (data, type) => {
    updateMe(prev=>{
      return {
        click:true,
        type: type,
        name: type === 'name'? data:prev.name,
        photo: type === 'photo'? data:prev.photo,
        email: type === 'email'? data:prev.email
      }
    })
  }
  const changeMyData = (e, type) => {
    let photo;
    if(type === 'photo'){
      photo = e.target.files[0]
    }
    updateMe(prev=>{
      return {
        click: true,
        type: type, 
        name: type === 'name'?e.target.value:prev.name,
        photo: type === 'photo'?photo:prev.photo,
        email: type === 'email'?e.target.value:prev.email
      }
    })
  }
  const updateMyData = (data, type) => {
    if(!data) return
    setDisplay('block')  
    dispatch(updateCurrentUserData(data, type, updateMe, setMsg))
  }

  const updateMyPhoto = (e, type) => {
    e.preventDefault()
    let formData = new FormData();
    formData.append('photo', me.photo)
    dispatch(updateCurrentUserData(formData, type, updateMe, setMsg))
  }
  // const savePhoto = (e) => {
  //   e.preventDefault()
  //   console.log(e.target.photo.value.split('\\')[2])
  // }
  // if(user){
    // const {name, email, role} = user;

  if(!user){
    return <p>Loading...</p>
  }
  return(
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
      <div>
        {/* <img style={{width:'100px', height: '100px'}} src = {me.photo&&URL.createObjectURL(me.photo)} alt = 'profile review pic' /> */}
        <ul style = {{listStyle:'none', fontSize:'25px'}}>
          <li>Name:{me.click&&me.type === 'name'?<input style={{width: '100px'}} onChange={(e)=>changeMyData(e,'name')} type = 'text' defaultValue={user.name}/>: user.name} <button type = 'submit' onClick={me.click&&me.type === 'name'?()=>updateMyData(me.name, 'name'):()=>editMyData(user.name,'name')}>{me.click&&me.type === 'name'?'update':'edit'}</button></li>
          <li>Email:{me.click && me.type === 'email'?<input style={{width: '100px'}} onChange={(e)=>changeMyData(e,'email')} type = 'text' defaultValue={user.email}/>: user.email} <button type = 'submit' onClick={me.click&&me.type === 'email'?()=>updateMyData(me.email, 'email'):()=>editMyData(user.email,'email')}>{me.click&&me.type === 'email'?'update':'edit'}</button></li>
            {me.type === 'email'&& message&&message.message.includes('E11000')?<h3 style={{color:'red', margin: '0', padding: '0', display: display }}>duplicate field error</h3>:''}
          <li>Role: {user.role}</li>
        </ul>

        <Link to = '/password/update'>Change password</Link>
      </div>
      <div>
        {!user.photo?<div style={{width: '300px',height: '300px',position: 'relative', top:'50%', left: '50%', transform: 'translate(-50% -50%)'}}><h1>Loading...</h1></div>:(
        <img style={{width:'300px', height: '300px', borderRadius:'3px', marginTop: '3rem'}} src = {me.photo?URL.createObjectURL(me.photo):`/public/img/users/${user.photo}`} />
        )}
        <form onSubmit={(e)=>updateMyPhoto(e, 'photo')}>
          <input type='file' onChange={(e)=>changeMyData(e,'photo')} name = 'photo' />
          <input type = 'submit' value = 'save' />
        </form>
        
      </div>
    </div>
)
}
export default About;