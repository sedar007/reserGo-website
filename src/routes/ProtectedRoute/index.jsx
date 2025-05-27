import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from '../../services/authServices';


const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const authService = new AuthService();

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await authService.isAuthenticated();
      setIsAuthenticated(authStatus);
    };
    checkAuth();
  }, [authService]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
