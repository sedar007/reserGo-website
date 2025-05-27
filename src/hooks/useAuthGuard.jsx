import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService.jsx';

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const authService = new AuthService();

  useEffect(() => {
    authService.isAuthenticated().then((isAuthenticated) => {
      console.log(isAuthenticated);
      if (!isAuthenticated) {
        console.log('not authenticated');
        navigate('/sign-in');
      }
    });
  }, []);
};
