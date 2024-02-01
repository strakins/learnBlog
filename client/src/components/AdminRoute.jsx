import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {

  // const navigate = useNavigate();

  const {currentUser} = useSelector((state) => state.user)

  return currentUser && 
    currentUser.isAdmin ? <Outlet /> : <Navigate to='/login' />
}

export default AdminRoute;