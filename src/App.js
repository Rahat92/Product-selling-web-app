import React, { useEffect } from 'react';
import Main from './Main';
import { BrowserRouter as Router, Routes, Route,Navigate, useNavigate, Link, NavLink } from 'react-router-dom';
import Product from './EditProduct';
import Params from './Params';
import SearchResult from './SearchResult';
import Login from './Login';
import About from './About';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './actions';
import UserState from './UserState';
import LoginComponent from './LoginComponent';
const App = () => {
  const pathName = window.location.pathname
  const dispatch = useDispatch();
  const { user } = useSelector(state=>state.user)
  console.log(user)
  useEffect(() => {
    dispatch(getMe())
  },[])
  return(
    <div>
      <Router>
      {user&&<div style={{position: 'fixed', top:'0', right:'3rem'}}><Link to = '/me'><h2>{user.name}(<span style={{color:'red', bold:'bolder'}}>{user.role}</span>)</h2></Link></div>}
      {!pathName.includes('login')&&<UserState />}
        <Routes>
          <Route path = "/" element = {<Main/>}/>
          <Route path = {`product/:id`} element = {<Product/>}/>
          <Route path = {`/params`} element = {<Params/>}/>
          <Route path = {`/search/:keyword`} element = {<Main/>}/>
          <Route path = {`/login`} element = {<Login/>}/>
          <Route path = {`/me`} element = {<About />}/>
          <Route path = {`product/:id`} element = {<Navigate to = '/'/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
