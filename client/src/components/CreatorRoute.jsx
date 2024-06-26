import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const CreatorRoute = () => {
    const {currentUser} = useSelector((state) => state.user)

    return currentUser && 
      currentUser.isCreator || currentUser.isAdmin ? <Outlet /> : <Navigate to='/restricted' />
}


export default CreatorRoute