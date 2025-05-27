import React from 'react';
import SignInForm from '../../components/forms/auth/SignInForm';
import { AuthService } from '../../services/authServices.jsx';

const authService = new AuthService();

const SignInPage = () => {
    const handleLogin = async (email, password) => {
        await authService.signIn(email, password);
        window.location.href = '/';
    };

    return (
        <div>
            <SignInForm auth={handleLogin} />
        </div>
    );
};

export default SignInPage;
