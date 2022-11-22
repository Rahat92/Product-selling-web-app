import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from './actions';
const User = () => {
  const { userId } = useParams();
  console.log(userId)
  const { loading, user, message } = useSelector(state => state.normalUser)
  console.log(user)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(userId))
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
      <h3>{user.name}</h3>
      {user.email}
    </div>
  )
}
export default User