import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { AuthContextType } from '../../../models/AuthTypeV2.ts';

interface GoogleAuthProps {
  auth: AuthContextType | undefined;
  text?: 'signin_with' | 'signup_with';
}
const GoogleAuthComponent: React.FC<GoogleAuthProps> = ({ auth, text }) => {
  const handleLoginSuccess = async (response: CredentialResponse) => {
    if (auth) {
      try {
        await auth.signUpGoogle(response.credential);
      } catch (error) {
        console.error('Error during Google sign-up', error);
      }
    }
  };

  const handleLoginFailure = () => {
    console.error('Google login failed');
  };

  return (
    <GoogleLogin
      containerProps={{
        className:
          'inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10',
      }}
      onSuccess={handleLoginSuccess}
      onError={handleLoginFailure}
      text={text}
    />
  );
};

export default GoogleAuthComponent;
