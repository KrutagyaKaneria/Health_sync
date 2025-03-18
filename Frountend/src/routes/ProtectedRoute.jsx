import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useContext(authContext);

  // Fallback to localStorage if context is not populated
  const storedToken = localStorage.getItem('token');
  const storedRole = localStorage.getItem('role');

  const isAuthenticated = token || storedToken;
  const userRole = role || storedRole;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;