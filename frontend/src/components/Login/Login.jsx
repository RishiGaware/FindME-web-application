import React, { useState , useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { useUser } from '../../context/UserContext';

const Login = () => {
  const { setUser } = useUser(); // Get setUser from context
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(null); // Clear previous error

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Send credentials to include cookies
      });

      const data = await response.json();

      if (response.ok) {
        // Store the user object in context
        setUser({
          userId: data.user.userId,
          name: data.user.name,
          username: data.user.username,
          role: data.user.role,
          authentication: true, // Set authentication flag to true
        });

        // Redirect to the homepage on successful login
        navigate('/');
      } else {
        // Handle login error
        setError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Error during login, please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className={styles.centeredContainer}>
      <div className={`${styles.container} w-full max-w-md rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-white-800 dark:border-gray-700`}>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
            Sign In
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-550 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your username"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-550 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            {/* Show error message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Show loading spinner or sign-in button */}
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <svg
                  role="status"
                  className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9765 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9765 100 50.5908ZM9.08169 50.5908C9.08169 73.3263 27.2645 91.5091 50 91.5091C72.7355 91.5091 90.9183 73.3263 90.9183 50.5908C90.9183 27.8554 72.7355 9.67266 50 9.67266C27.2645 9.67266 9.08169 27.8554 9.08169 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8435 15.1192 80.6512 10.7231 74.6043 7.55334C68.5575 4.38351 61.8352 2.51562 54.8602 2.07894C49.8201 1.73027 44.7395 2.102 39.799 3.16719C37.3747 3.70444 35.8961 6.19662 36.7406 8.55429C37.5851 10.9119 40.0204 12.2929 42.4757 11.9297C46.8125 11.2855 51.2311 11.4426 55.4658 12.3875C60.8723 13.5807 65.9046 15.8998 70.1116 19.1887C74.3187 22.4776 77.5976 26.6813 79.615 31.444C81.2724 35.348 82.1543 39.5756 82.2207 43.8387C82.2562 46.2279 84.5427 48.0301 86.8999 47.393Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                'Sign in'
              )}
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-500">
              Don’t have an account yet?{' '}
              <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
