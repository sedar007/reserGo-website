'use client'

import {useContext, useEffect, useState} from 'react';
import logo from '../../assets/logo-transparent.png';
import {Eye, EyeOff} from 'lucide-react';
import {AuthContext} from '../../context/authContext.jsx';
import {useNavigate} from 'react-router-dom';

export default function SignIn() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (auth?.isAuthenticated || auth?.username) {
            navigate('/');
        }
    }, [navigate, auth]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordError('');
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

            setLoading(true);
            try {
                const signUpRequest = {
                    firstName,
                    lastName,
                    username,
                    email,
                    password
                };

                await auth.signUp(signUpRequest);
                await auth.loginUser(username, password);
                setError(null);
                navigate('/');
            } catch (err) {
                if (err.response?.status === 400) setError(err.response?.data);
            } finally {
                setLoading(false);
            }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="hidden lg:flex lg:flex-1 lg:justify-start">
                <a href="/sign-in" className="text-sm/6 font-semibold text-gray-900">
                    <span aria-hidden="true">&larr;</span> Retour
                </a>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src={logo}
                    className="mx-auto h-30 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#3f170e]">
                    Inscription
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-[#3f170e]">
                                First name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="first-name"
                                    name="first-name"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    autoComplete="given-name"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="last-name" className="block text-sm/6 font-medium text-[#3f170e]">
                                Last name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="last-name"
                                    name="last-name"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    autoComplete="family-name"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm/6 font-medium text-[#3f170e]">
                            Nom d'utilisateur
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-[#3f170e] outline-1 -outline-offset-1 outline-[#d56a34] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#d56a34] sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-[#3f170e]">
                            Adresse email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-[#3f170e] outline-1 -outline-offset-1 outline-[#d56a34] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#d56a34] sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm/6 font-medium text-[#3f170e]">
                            Nouveau mot de passe
                        </label>
                        <div className="mt-2 relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 pr-10 text-base text-[#3f170e] outline-1 -outline-offset-1 outline-[#d56a34] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#d56a34] sm:text-sm/6"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-2 flex items-center text-[#d56a34] hover:text-[#3f170e]"
                                tabIndex={-1}
                            >
                                {showPassword ? <Eye size={20}/> : <EyeOff size={20}/>}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-[#3f170e]">
                            Confirmer le nouveau mot de passe
                        </label>
                        <div className="mt-2 relative">
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 pr-10 text-base text-[#3f170e] outline-1 -outline-offset-1 outline-[#d56a34] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#d56a34] sm:text-sm/6"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-2 flex items-center text-[#d56a34] hover:text-[#3f170e]"
                                tabIndex={-1}
                            >
                                {showPassword ? <Eye size={20}/> : <EyeOff size={20}/>}
                            </button>
                        </div>
                    </div>

                    {passwordError && (
                        <p className="text-sm text-red-500">{passwordError}</p>
                    )}
                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center rounded-md bg-[#d56a34] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#3f170e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d56a34]"
                        >
                            {loading ? 'Loading...' : "S'inscrire"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
