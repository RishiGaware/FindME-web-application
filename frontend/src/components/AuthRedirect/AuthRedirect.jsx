import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const AuthRedirect = ({ children }) => {
  const { user } = useUser(); // Get the user from context

  if (user) {
    // If the user is already logged in, redirect to the home page
    return <Navigate to="/" />;
  }

  // If no user is logged in, render the login or signup page
  return children;
};

export default AuthRedirect;
