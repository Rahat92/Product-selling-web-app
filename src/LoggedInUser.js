import { Link } from "react-router-dom";
const LoggedInUser = ({user}) => {
  return (
    <div style={{display:'flex',alignItems: 'center'}}>
      <h2><Link to = '/me'>{user.name.split(' ')[0]}(<span>{user.role}</span>)</Link></h2>
      <img style={{width:'50px', height:'50px', marginLeft: '10px', borderRadius:'50%' }} src = {`/public/img/users/${user.photo}`} alt = 'profile photo' />
    </div>  
  )
}
export default LoggedInUser;