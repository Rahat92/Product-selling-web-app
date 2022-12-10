import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from './actions';
import './User.css';
const User = ({name, email, role, photo}) => {
  console.log(name, email, role, photo)
  const { userId } = useParams();
  const { loading, user, message } = useSelector(state => state.normalUser)
  console.log(loading, user,)
  const dispatch = useDispatch();
  useEffect(() => {
    if(!name||!email || !role){
      dispatch(getUser(userId))
    }
  },[])
  if(message){
    return (
      <div>
        <h2 style={ { color: 'red' } }>{message.message}</h2>
      </div>
    )
  }

  // console.log(user.photo, photo)
  return (
    <div>
      <div className='imgDiv'>
        {loading?<div className='imgLoadDiv'></div>:(
          <img src = {`/public/img/users/${user&&userId === user._id? user.photo:photo}`} alt = {'user photo'} />
        )}
      </div>
      <h3>Name: {user&&userId === user._id?user.name:name}</h3>
      <h2>Email: {user&&userId === user._id?user.email:email}</h2>
      <h2>Role: {user&&userId === user._id?user.role:role}</h2>
    </div>
  )
}
export default User