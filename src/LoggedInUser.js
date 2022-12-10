import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './LoggedInUser.css';
const LoggedInUser = () => {  
  const {user, isAuthenticated, loading} = useSelector(state => state.user);
  console.log(loading)
  return (
    <div className="super_div_logged_in_user">
      {!loading&&isAuthenticated&&(
        <React.Fragment>
          <h2><Link to = '/me'><a>{isAuthenticated&&user.name.split(' ')[0]}(<span>{user.role}</span>)</a></Link></h2>
          <div image_div_logged_in_user>
            <img src = {`/public/img/users/${user.photo}`} alt = 'profile photo' />          
          </div>
        </React.Fragment>
      )}
    </div>  
  )
}
export default LoggedInUser;