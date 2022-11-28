import { Link } from "react-router-dom";
const LoggedInUser = ({user}) => {
  return (
    <div style={{position: 'fixed', display: 'flex', alignItems:'center', top:'0', right:'3rem'}}>
      <Link to = '/me'><h2>{user.name}(<span style={{color:'red', bold:'bolder'}}>{user.role}</span>)</h2></Link>
      <img style={{width:'50px', height:'50px', marginLeft: '10px', borderRadius:'50%' }} src = {`/public/img/users/${user.photo}`} alt = 'profile photo' />
    </div>  
  )
}
export default LoggedInUser;