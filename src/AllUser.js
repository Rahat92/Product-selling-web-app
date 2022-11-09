import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from './actions';
const AllUser = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.users)
  console.log(user)
  useEffect(()=> {
    dispatch(getAllUser())
  },[])
  return(
    <div>
      <ul style={{listStyle: 'none'}}>
        {user&&user.docs&&user.docs.map(el=>{
          return(
            <li><h3>{el.name}</h3></li>
          )
        })}
      </ul>
    </div>
  )
}
export default AllUser;