import React, { useEffect, useState } from 'react';
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
import Count from './Count';
import CountMany from './CountMany';
import AllUser from './AllUser';
import Names from './Names';
import store from './store';
const App = () => {
  const pathName = window.location.pathname
  const [ productData, setProductData ] = useState({
    productName:'',
    productRating:''
  })
  const { productName, productRating } = productData;
  const dispatch = useDispatch();
  const { user } = useSelector(state=>state.user)
  console.log(user)
  useEffect(() => {
    store.dispatch(getMe())
  },[])
  const anyFunc = (productName, productRating) => {
    setProductData({
      productName : productName,
      productRating : productRating
    })
  }
  return(
    <div>
      <Router>
      {user&&<div style={{position: 'fixed', top:'0', right:'3rem'}}><Link to = '/me'><h2>{user.name}(<span style={{color:'red', bold:'bolder'}}>{user.role}</span>)</h2></Link></div>}
      {!pathName.includes('login')&&!pathName.includes('count')&&<UserState />}
      &nbsp;&nbsp;&nbsp;
      <Link to = '/'>Home</Link> &nbsp;&nbsp;&nbsp; 
      <Link to = '/admin/alluser'>All User</Link>
        <Routes>
          <Route path = "/" element = {<Main anyFunc={anyFunc}/>}/>
          <Route path = {`product/:id`} element = {<Product  productName = {productName} productRating = {productRating}/>}/>
          <Route path = {`/params`} element = {<Params/>}/>
          <Route path = {`/search/:keyword`} element = {<Main />}/>
          <Route path = {`/login`} element = {<Login/>}/>
          <Route path = {`/me`} element = {<About />}/>
          {/* <Route path = {`product/:id`} element = {<Navigate to = '/'/>}/> */}
          <Route path = {`/count`} element = {<Count />}/>
          <Route path = {`/countmany`} element = {<CountMany />}/>
          <Route path = {`/admin/alluser`} element = {<AllUser />}/>
          <Route path = {`/names/`} element = {<Names />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
