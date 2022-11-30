import React, { useEffect, useState } from 'react';
import Main from './Main';
import LoggedInUser from './LoggedInUser';
import { BrowserRouter as Router, Routes, Route,Navigate, useNavigate, Link, NavLink } from 'react-router-dom';
import Register from './Register';
import Product from './EditProduct';
import Params from './Params';
import SearchResult from './SearchResult';
import Login from './Login';
import About from './About';
import { useDispatch, useSelector } from 'react-redux';
import { getMe, getUser } from './actions';
import UserState from './UserState';
import LoginComponent from './LoginComponent';
import Count from './Count';
import CountMany from './CountMany';
import AllUser from './AllUser';
import Names from './Names';
import User from './User';
import store from './store';
import './App.css';
const App = () => {
  const pathName = window.location.pathname
  const [ productData, setProductData ] = useState({
    productName:'',
    productPrice:0,
    productPhoto: '',
    productCategory: ''
  })
  const [ userData, setUserData ] = useState({
    name: '',
    email: '',
    role: ''
  })
  const { productName, productPrice, productPhoto } = productData;
  const dispatch = useDispatch();
  const { user } = useSelector(state=>state.user)
  useEffect(() => {
    store.dispatch(getMe())
  },[dispatch])
  const anyFunc = (productName, productPrice, productPhoto, productCategory) => {
    setProductData({
      productName : productName,
      productPrice : productPrice,
      productPhoto: productPhoto,
      productCategory: productCategory
    })
  }
  const getUserData = (name, email, role) => {
    setUserData({
      name, email, role
    })
  }
  const { name, email, role } = userData;
  return(
    <div className='app'>
      <Router>
      {user&&user.name&&user.role&& <LoggedInUser user = {user} />}
      <UserState />
      &nbsp;&nbsp;&nbsp;
      <Link to = '/'>Home</Link> &nbsp;&nbsp;&nbsp; 
      <Link to = '/admin/alluser'>All User</Link>
        <Routes>
          <Route path = "/" element = {<Main anyFunc={anyFunc}/>}/>
          <Route path = {`product/:id`} element = {<Product  productName = {productName} productPrice = {productPrice} productPhoto = {productPhoto} />}/>
          <Route path = {`/params`} element = {<Params/>}/>
          <Route path = {`/search/:keyword`} element = {<Main />}/>
          <Route path = {`/login`} element = {<Login/>}/>
          <Route path = {`/me`} element = {<About />}/>
          {/* <Route path = {`product/:id`} element = {<Navigate to = '/'/>}/> */}
          <Route path = {`/count`} element = {<Count />}/>
          <Route path = {`/countmany`} element = {<CountMany />}/>
          <Route path = {`/admin/alluser`} element = {<AllUser getUserData = {getUserData} />}/>
          <Route path = {`/names/`} element = {<Names />}/>
          <Route path = {`/profile/:userId`} element = {<User name = {name} email = {email} role = {role} />}/>
          <Route path = {`/register`} element = {<Register />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
