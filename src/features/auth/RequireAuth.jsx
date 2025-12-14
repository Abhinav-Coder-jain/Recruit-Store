import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const RequireAuth = ({ children }) => {
  const { user, loading } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (!user) {
    // Redirect to login, but pass the current location AND a message
    return <Navigate 
      to="/login" 
      state={{ from: location, message: "You must be logged in to access that page." }} 
      replace 
    />;
  }

  return children;
};

export default RequireAuth;