import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from './actions';
const User = ({name, email, role}) => {
  console.log(name, email)
  const { userId } = useParams();
  console.log(userId)
  const { loading, user, message } = useSelector(state => state.normalUser)
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
  if( !user ){
    return <h1>Loading...</h1>
  }
  return (
    <div>
      <h3>{userId === user._id?user.name:name}</h3>
      <h2>{userId === user._id?user.email:email}</h2>
      <h2>{userId === user._id?user.role:role}</h2>
    </div>
  )
}
export default User