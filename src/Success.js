import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate('/')
  const mainDir = () => {
    navigate('/')
  }
  return (
    <div>
      <h1>Successfully deleted data</h1>
      <button type="button" onClick={mainDir}>Go To Home Page</button>
    </div>
  )
}
export default Success;