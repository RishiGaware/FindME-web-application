import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Get user from localStorage

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the requested component
  return children;
};

export default ProtectedRoute;
