import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMe } from "./actions";
const LoggedInUser = () => {  
  const {user, isAuthenticated, loading} = useSelector(state => state.user);
  console.log(loading)
  return (
    <div style={{display:'flex',alignItems: 'center', width:'200px',height:'70px'}}>
      {!loading&&isAuthenticated&&(
        <React.Fragment>
          <h2><Link to = '/me'>{isAuthenticated&&user.name.split(' ')[0]}(<span>{user.role}</span>)</Link></h2>
          <div>
              <img style={{width:'50px', height:'50px', marginLeft: '10px', borderRadius:'50%' }} src = {`/public/img/users/${user.photo}`} alt = 'profile photo' />          
          </div>
        </React.Fragment>
      )}
    </div>  
  )
}
export default LoggedInUser;