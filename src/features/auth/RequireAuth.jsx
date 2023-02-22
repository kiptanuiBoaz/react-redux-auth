import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();
    return (
        //render children compoenets if logged in otherwise navigate to login page and replace the history
        token
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;