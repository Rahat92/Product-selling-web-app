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
    return(
        <div><h1>About page</h1></div>
    )
  }
  }
export default About;