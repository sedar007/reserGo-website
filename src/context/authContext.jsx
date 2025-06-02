import React, { createContext, useEffect, useState, useMemo } from 'react';
import { AuthService } from '../services/authServices.jsx';
import {UserServices} from "../services/userServices.js";

export const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
    const authService = new AuthService();
    const [username, setUsername] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
       checkAuthStatus();
    }, []);

    const loginUser = async (login, password) => {
        try {
            const response = await authService.signIn(login, password);
            if (!response) return;

            setUsername(response.username);
            const userServices = new UserServices();
            const url = await userServices.getUserProfilePicture();
            setProfilePicture(url);
            setIsAuthenticated(true);
        } catch(error) {
            setUsername(null);
            setProfilePicture(null);
            setIsAuthenticated(false);
            throw error;
        }
    };

    const logoutUser = async () => {
        try {
            await authService.signOut();
            setUsername(null);
            setProfilePicture(null);
            setIsAuthenticated(false);
        } catch (error) {
            if(error.status === 500) throw new Error('Erreur serveur');
            throw error;
        }
    };

    const signUp = async (request) => {
        try {
            await authService.signUp(request);
        } catch (error) {
            if(error.status === 500) throw new Error('Erreur serveur');
            throw error;
        }
    };


    const checkAuthStatus = async () => {
        try {
            const data = await authService.getProtectedData();
            if (data) {
                setUsername(data.username);
                const userServices = new UserServices();
                const url = await userServices.getUserProfilePicture();
                setProfilePicture(url);
                setIsAuthenticated(true);
            }
        } catch {
            setUsername(null);
            setProfilePicture(null);
            setIsAuthenticated(false);
        }
    };


    const contextValue = useMemo(
        () => ({
            username,
            profilePicture,
            loginUser,
            logoutUser,
            signUp,
            isAuthenticated
        }),
        [username, profilePicture, isAuthenticated]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
