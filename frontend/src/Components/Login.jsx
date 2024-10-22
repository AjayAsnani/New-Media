import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { FaUser, FaLock } from 'react-icons/fa'; // Icons for User and Password
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Eye icons
import { Link } from 'react-router-dom';
import '../app.css';

const Login = () => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState(''); // State to display login errors
  const [loading, setLoading] = useState(false); // State for loading indicator

  const navigate = useNavigate(); // React Router navigation hook

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle login
  const handleLogin = async () => {
    setLoading(true);
    setError('');
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('token', data.token); // Store the JWT token
        navigate('/accountPage');
      } else {
        setError(data.message || 'Invalid username or password.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-fit pt-20 pb-10">
      <div className="bg-white p-8 shadow-all rounded w-full max-w-md">
        <h1 className="text-4xl text-center mb-10">LOGIN</h1>

        {/* Email Input */}
        <div className="flex items-center border border-gray-300 rounded mb-4 p-2">
          <FaUser className="text-gray-500 mr-3" />
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading} // Disable inputs while loading
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center border border-gray-300 rounded mb-4 p-2">
          <FaLock className="text-gray-500 mr-3" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Password"
            className="w-full outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading} // Disable inputs while loading
          />
          <button onClick={togglePasswordVisibility} className="focus:outline-none">
            {showPassword ? (
              <AiFillEye className="text-gray-500" />
            ) : (
              <AiFillEyeInvisible className="text-gray-500" />
            )}
          </button>
        </div>

        {/* Display Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Forgot Password Link */}
        <div className="text-right mb-4">
          <Link to="/forgotPassword" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className={`w-full bg-blue-500 text-white text-lg py-2 rounded hover:bg-blue-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;
