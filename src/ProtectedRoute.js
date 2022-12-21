import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({isAdmin}) => {
  const {user, isAuthenticated, loading} = useSelector(state=>state.user)
  return(
    loading === false&&(
      <div>
        {
          isAuthenticated&&isAdmin&&user.role !== 'admin'?<Navigate to = '/'/>:!isAuthenticated?<Navigate to = '/login'/>:<Outlet />
        }
      </div>
    )
  )
}
export default ProtectedRoute;