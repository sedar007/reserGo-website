import React, { createContext, useEffect, useState, useMemo } from 'react';
import { AuthService } from '../services/authServices.jsx';
import {UserServices} from "../services/userServices.js";
import api from "../services/api.js";

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
        } catch {
            setUsername(null);
            setProfilePicture(null);
            setIsAuthenticated(false);
        }
    };

    const logoutUser = async () => {
        try {
            await authService.signOut();
            setUsername(null);
            setProfilePicture(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Erreur lors de la déconnexion", error);
        }
    };

    const signUp = async (request) => {
        try {
            console.log("Envoi de la requête d'inscription", request);
            await authService.signUp(request);
        } catch (error) {

            console.error("Erreur lors de l'inscription", error);
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
        } catch (error) {
            setUsername(null);
            setProfilePicture(null);
            setIsAuthenticated(false);
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
