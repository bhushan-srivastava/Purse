import { Navigate } from 'react-router-dom';
import Loader from '../../loaders/Loader';
import { useAuth } from '../AuthContext';

const PrivateRoute = ({ children, redirectTo = "/login" }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <Loader />;
    }

    return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;