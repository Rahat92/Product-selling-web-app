import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getLogOut, getMe } from './actions';

const UserState = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector(state=>state.user)
  const {logOut} = useSelector(state=>state)
  useEffect(()=>{
    dispatch(getMe())
  },[])
  // const goLogin = () => {
  //     if(!logOut.isAuthenticated){
  //       navigate('/login')
  //     }else{
  //       navigate('/')
  //     }
  // }
  return(
    <>
        {user&&(
          <button type = 'button' onClick={()=>{
            dispatch(getLogOut(navigate))
            // setTimeout(()=>goLogin(),500)
          }}>Log out</button>
        )}
        {!user&&!window.location.pathname.includes('/login')&&(
            <button type = 'button' onClick={()=>navigate('/login')}>Login</button>
        )}
    </>
  )
}
export default UserState;