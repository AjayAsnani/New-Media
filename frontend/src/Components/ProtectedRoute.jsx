import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

// ProtectedRoute checks if the user has a valid token before granting access to a route
const ProtectedRoute = ({ children }) => {
  // Check if a token exists in localStorage or sessionStorage
  const token = localStorage.getItem('token'); // You can also use sessionStorage

  // If no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If a token exists, allow access to the protected route
  return children;
};

// Add prop types validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a required node
};

export default ProtectedRoute;
