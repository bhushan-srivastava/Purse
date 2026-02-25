import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const clearAuthState = useCallback(() => {
        setIsAuthenticated(false);
        setUser(null);
    }, []);

    useEffect(() => {
        const verifySession = async () => {
            try {
                const response = await fetch('/api/auth', {
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error();
                }
                const responseData = await response.json();
                setIsAuthenticated(true);
                setUser(responseData.user || null);
            } catch {
                clearAuthState();
            } finally {
                setIsLoading(false);
            }
        };

        verifySession();
    }, [clearAuthState]);

    const login = useCallback(async (email, password) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Login failed');
            }
            const { name } = responseData;

            const userInfo = { name, email };
            setUser(userInfo);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            const errorMessage = error.message || 'Login failed';
            clearAuthState();
            return { success: false, message: errorMessage };
        } finally {
            setIsLoading(false);
        }
    }, [clearAuthState]);

    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
        } finally {
            // client logout even if server logout fails/succeeds
            clearAuthState();
            setIsLoading(false);
        }
    }, [clearAuthState]);

    const value = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
