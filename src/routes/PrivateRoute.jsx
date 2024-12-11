// import { Navigate } from 'react-router-dom';
// import { useAuth } from 'context/AuthContext';

// const PrivateRoute = ({ element }) => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? element : <Navigate to="/login" />;
// };

// export default PrivateRoute;
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken'); // Check if user is authenticated
  console.log('localStorage.getItem', localStorage.getItem('authToken')); // Check if the token is set

  return authToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
