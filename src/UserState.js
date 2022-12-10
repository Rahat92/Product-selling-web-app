import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getLogOut, getMe } from './actions';

const UserState = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user, isAuthenticated, loading} = useSelector(state=>state.user)
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
    <div style={{width:'100px'}}>
        {!loading&&isAuthenticated&&(
          <button type = 'button' onClick={()=>{
            dispatch(getLogOut(navigate))
            // setTimeout(()=>goLogin(),500)
          }}>Log out</button>
        )}
        {!loading&&!isAuthenticated&&!window.location.pathname.includes('/login')&&(
            <button type = 'button' onClick={()=>navigate('/login')}>Login</button>
        )}
    </div>
  )
}
export default UserState;