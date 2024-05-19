import {useAuth} from "../conntexts/UserContext";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = ({
                            role,
                            redirectPath = '/login',
                            children,
                        }) => {

    const {user}  = useAuth();
    if (!user) {
        return <Navigate to={redirectPath} replace = {true}/>;
    }
    else if (role && role !== user.role) {
        return <Navigate to={'/unauthorized'} replace = {true}/>;
    }

    return children ? children : <Outlet/>;
};

export default ProtectedRoute;