import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
  requiredAccess?: () => boolean;
  fallbackPath?: string;
}

export default function ProtectedRoute({ 
  children, 
  roles, 
  requiredAccess,
  fallbackPath = '/dashboard'
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user?.role || '')) {
    return <Navigate to={fallbackPath} />;
  }

  if (requiredAccess && !requiredAccess()) {
    return <Navigate to={fallbackPath} />;
  }

  return <>{children}</>;
}