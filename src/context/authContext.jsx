import React, { createContext, useEffect, useState, useMemo } from 'react';
import { AuthService } from '../services/authServices.jsx';
import { UserServices } from '../services/userServices.jsx';
import { googleLogout } from '@react-oauth/google';

export const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
    const authService = new AuthService();
    const [username, setUsername] = useState(null);
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
        } catch (error) {
            console.error("Erreur lors de la connexion", error);
        }
    };

    const logoutUser = async () => {
        try {
            googleLogout();
            await authService.signOut();
            setUsername(null);
            setProfilePicture(null);
        } catch (error) {
            console.error("Erreur lors de la déconnexion", error);
        }
    };

    const signUp = async (request) => {
        try {
            await authService.signUp(request);
        } catch (error) {
            console.error("Erreur lors de l'inscription", error);
        }
    };

    const signUpGoogle = async (credential) => {
        try {
            const response = await authService.signUpGoogle(credential);
            if (!response) return;

            setUsername(response.username);
            const userServices = new UserServices();
            const url = await userServices.getUserProfilePicture();
            setProfilePicture(url);
        } catch (error) {
            console.error("Erreur lors de l'inscription via Google", error);
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
            }
        } catch (error) {
            setUsername(null);
            setProfilePicture(null);
            console.error("L'utilisateur n'est pas authentifié", error);
        }
    };

    const contextValue = useMemo(
        () => ({
            username,
            profilePicture,
            loginUser,
            logoutUser,
            signUp,
            signUpGoogle,
        }),
        [username, profilePicture]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
