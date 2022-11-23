import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../../Loader';
import getAuth from './authorization';

const PrivateRoute = ({ children, redirectTo }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let mounted = true;

        getAuth()
            .then((result) => {
                if (mounted) {
                    setIsAuth(result); // This line 2
                    setIsLoading(false); // This line 1
                }
            })
            .catch((error) => {
                if (mounted) {
                    setIsAuth(false);
                    setIsLoading(false);
                }
            });

        return () => {
            mounted = false;
        }
    }, []);

    return (
        isLoading ?
            <Loader />
            :
            (
                isAuth ? children : <Navigate to={redirectTo} />
            )
    );
};

export default PrivateRoute;