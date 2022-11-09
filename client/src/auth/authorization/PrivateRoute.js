import { Navigate } from "react-router-dom"
import getAuthorization from "./authorization";

const PrivateRoute = ({ children, redirectTo }) => {
    return (
        getAuthorization("") ? children : <Navigate to={redirectTo} />
        // getAuthorization("hello world") ? children : <Navigate to={redirectTo} />
    );
}

export default PrivateRoute;