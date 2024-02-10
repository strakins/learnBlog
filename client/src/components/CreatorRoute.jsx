import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const CreatorRoute = () => {
    const {currentUser} = useSelector((state) => state.user)

    return currentUser && 
      currentUser.isCreator ? <Outlet /> : <Navigate to='/upgrade' />
}


export default CreatorRoute