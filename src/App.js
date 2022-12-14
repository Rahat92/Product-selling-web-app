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
import ProtectedRoute from './ProtectedRoute';
import UpdatePassword from './UpdatePassword';
const App = () => {
  const pathName = window.location.pathname
  const [ productData, setProductData ] = useState({
    productName:'',
    productCategory: '',
    productPrice:'',
    productPhoto: '',
  })
  const [ userData, setUserData ] = useState({
    name: '',
    email: '',
    role: '',
    photo: ''
  })
  const { productName, productPrice, productPhoto, productCategory } = productData;
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector(state=>state.user)
  useEffect(() => {
    store.dispatch(getMe())
  },[dispatch])
  const anyFunc = (productName, productPrice, productPhoto, productCategory) => {
    setProductData({
      productName : productName,
      productCategory: productCategory,
      productPrice : productPrice,
      productPhoto: productPhoto,
    })
  }
  const getUserData = (name, email, role, photo) => {
    setUserData({
      name, email, role, photo
    })
  }
  const { name, email, role, photo } = userData;
  return(
    <div className='app'>
      <Router>
      <div className='nav_bar'>
        <div style={{order:1, marginLeft: 'auto',flex: '0 20%'}}>{<LoggedInUser/>}</div>
          <UserState />
        &nbsp;&nbsp;&nbsp;
        <Link to = '/'>Home</Link> &nbsp;&nbsp;&nbsp; 
        <Link to = '/admin/alluser'>All User</Link>      
      </div>
        <Routes>
          <Route path = "/" element = {<Main anyFunc={anyFunc}/>}/>
          <Route path = {`product/:id`} element = {<Product  productName = {productName} productPrice = {productPrice} productPhoto = {productPhoto} productCategory = {productCategory} />}/>
          <Route path = {`/params`} element = {<Params/>}/>
          <Route path = {`/search/:keyword`} element = {<Main />}/>
          <Route path = {`/login`} element = {<Login/>}/>
          {/* <Route path = {`/me`} element = {<About />}/> */}
          {/* <Route path = {`product/:id`} element = {<Navigate to = '/'/>}/> */}
          <Route path = {`/count`} element = {<Count />}/>
          <Route path = {`/countmany`} element = {<CountMany />}/>
          <Route path = {`/names/`} element = {<Names />}/>
          {/* <Route path = {`/profile/:userId`} element = {<User name = {name} email = {email} role = {role} photo = {photo} />}/> */}
          <Route path = {`/register`} element = {<Register />}/>
          {/* <Route path = {`/password/update`} element = {<UpdatePassword />}/> */}
          <Route element = {<ProtectedRoute isAdmin = {true} />}>
            <Route element = {<h1>Hello world! this route is protected.only for admin</h1>} path = '/admin/dashboard'/>
            <Route element = {<AllUser getUserData = {getUserData} />} path = {`/admin/alluser`} />
          </Route>
          <Route element = {<ProtectedRoute />}>
            <Route element = {<h1>this is Login user rout. not requiring to be an admin</h1>} path = '/normal'/>
            <Route element = {<AllUser getUserData = {getUserData} />} path = {`/admin/alluser`} />
            <Route path = {`/profile/:userId`} element = {<User name = {name} email = {email} role = {role} photo = {photo} />}/>
            <Route path = {`/me`} element = {<About />}/>
            <Route path = {`/password/update`} element = {<UpdatePassword />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
