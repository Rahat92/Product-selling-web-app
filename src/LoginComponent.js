import { Link, useNavigate } from "react-router-dom"

const LoginComponent = () => {
  const navigate = useNavigate();
  return (
    <button type = 'button' onClick={()=>navigate('/login')}>Login</button>
  )
}
export default LoginComponent;