import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../Loader';

const PrivateRoute = ({ children, redirectTo }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let mounted = true;

        fetch('/api/auth', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(responseData => {
                if (mounted) {
                    if (responseData.message === 'Authorized') {
                        setIsAuth(true); // This line 2
                        setIsLoading(false); // This line 1
                    }
                    else {
                        setIsAuth(false); // This line 2
                        setIsLoading(false); // This line 1
                    }
                }
            })
            .catch(
                (err) => {
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