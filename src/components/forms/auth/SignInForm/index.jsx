'use client';

import {useContext, useEffect, useState} from 'react';
import logo from '../../../../assets/logo-transparent.png';
import { Eye, EyeOff } from 'lucide-react';
import { Switch } from '@headlessui/react';
import {useLocation, useNavigate} from 'react-router-dom';
import {AuthContext} from "../../../../context/authContext.jsx";

const SignInForm = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

   /* const from = location.from || "/";

    useEffect(() => {
        if (auth?.username ) {
            navigate('/');
        }
    }, [navigate, auth]);


    const handleSubmit = async (e) => {
        e.preventDefault();
            setLoading(true);
            try {
                await auth.loginUser(login, password);
                setError(null);
                console.log(from)
                // navigate('/');
                // navigate(from, { replace: true });
            } catch (err) {
                setError('Identifiants incorrects');
            } finally {
                setLoading(false);
            }
    }; */

    const redirectTo = location.state?.redirectTo || "/";
    const redirectState = location.state?.redirectState || null;

    useEffect(() => {
        if (auth?.username) {
            // Si déjà connecté, redirige vers la page souhaitée
            navigate(redirectTo, { state: redirectState });
        }
    }, [auth?.username]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await auth.loginUser(login, password);
            setError(null);
            navigate(redirectTo, { state: redirectState });
        } catch (err) {
            setError('Identifiants incorrects');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="hidden lg:flex lg:flex-1 lg:justify-start">
                <a href="/" className="text-sm font-semibold text-gray-900">
                    <span aria-hidden="true">&larr;</span> Retour
                </a>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src={logo} alt="Your Company" className="mx-auto h-30 w-auto" />
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-[#3f170e]">
                    Connexion à votre compte
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                    {error && <div className="text-red-600 text-sm font-medium">{error}</div>}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#3f170e]">
                            Adresse email ou nom d'utilisateur
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="text"
                                required
                                autoComplete="email"
                                placeholder="example@mail.com"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-[#3f170e] outline-1 outline-[#d56a34] placeholder:text-gray-400 focus:outline-2 focus:outline-[#d56a34] sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        {/*<div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-[#3f170e]">
                                Mot de passe
                            </label>
                            <a href="#" className="text-sm text-[#d56a34] hover:text-[#3f170e]">
                                Mot de passe oublié ?
                            </a>
                        </div> */}
                        <div className="mt-2 relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md bg-white px-3 py-1.5 pr-10 text-base text-[#3f170e] outline-1 outline-[#d56a34] placeholder:text-gray-400 focus:outline-2 focus:outline-[#d56a34] sm:text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-2 flex items-center text-[#d56a34] hover:text-[#3f170e]"
                            >
                                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-x-3">
                        <Switch
                            checked={isChecked}
                            onChange={setIsChecked}
                            className={`${
                                isChecked ? 'bg-[#d56a34]' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                        >
              <span
                  className={`${
                      isChecked ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
                        </Switch>
                        <span className="text-sm text-gray-600">Rester connecté</span>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center rounded-md bg-[#d56a34] px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[#3f170e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d56a34]"
                        >
                            {loading ? 'Connexion...' : 'Se connecter'}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-[#3f170e]">
                    Pas encore de compte ?{' '}
                    <a href="/sign-up" className="font-semibold text-[#d56a34] hover:text-[#3f170e]">
                        Inscrivez-vous
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignInForm;
