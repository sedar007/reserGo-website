import { useState } from 'react';
import Label from '../../ui/Label';
import Input from '../../forms/input/InputField';
import { EyeCloseIcon, EyeIcon } from '../../../assets/icons';
import { useNavigate } from 'react-router-dom';

const SignUpFormComponent = ({ auth }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordError('');
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        if (auth) {
            setLoading(true);
            try {
                const signUpRequest = {
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                    role: 0,
                };

                await auth.signUp(signUpRequest);
                setError(null);
                navigate('/signin');
            } catch (err) {
                if (err.response?.status === 400) setError(err.response?.data);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-5">
                {error && <div className="text-error-500">{error}</div>}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                        <Label>
                            First Name<span className="text-error-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="fname"
                            name="fname"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <Label>
                            Last Name<span className="text-error-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="lname"
                            name="lname"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <Label>
                        Username<span className="text-error-500">*</span>
                    </Label>
                    <Input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <Label>
                        Email<span className="text-error-500">*</span>
                    </Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <Label>
                        Password<span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                        <Input
                            placeholder="Enter your password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                        >
              {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </span>
                    </div>
                </div>
                <div>
                    <Label>
                        Confirm Password<span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                        <Input
                            placeholder="Confirm your password"
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                        >
              {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </span>
                    </div>
                    {passwordError && <p className="text-error-500">{passwordError}</p>}
                </div>
                <div>
                    <button
                        className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SignUpFormComponent;
