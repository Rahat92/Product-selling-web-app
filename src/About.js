import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from './actions';

const About = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  console.log(user)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getMe())
  },[])
  if(user === null||user==={}){
    navigate('/login')
  }
  if(user){
    const {name, email, role} = user;
    return(
        <div>
          <ul style = {{listStyle:'none', fontSize:'25px'}}>
            <li>Name: {name}</li>
            <li>Email: {email}</li>
            <li>Role: {role}</li>
          </ul>
        </div>
    )
  }
  }
export default About;