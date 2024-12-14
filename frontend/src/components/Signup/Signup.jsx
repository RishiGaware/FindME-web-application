import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import styles from './signup.module.css';

const Signup = () => {
  const navigate = useNavigate(); // Initialize navigate for redirection

  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!formData.terms) {
      alert('You must agree to the terms and conditions');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/user-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          phone: formData.phone,
          password: formData.password,
        }),
        credentials: 'include' // Ensures cookies are sent and received
      });
      
      const data = await response.json();

      if (response.ok) {
        // Log the successful signup message in the console
        console.log('Signup successful:', data);

        // Show success message as a popup
        alert('Signup successful! Please log in.');

        // Redirect to login page
        navigate('/login', { state: { message: 'Signup successful! Please log in.' } });
      } else {
        // Handle errors
        console.error('Signup failed:', data);
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Error during signup');
    }
  };

  return (
    <div className={styles.centeredContainer}>
      <div className={`${styles.container} w-full max-w-md rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-white-800 dark:border-gray-700`}>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
            Create a new account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-550 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Username Field */}
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
                placeholder="xyz@gmail.com"
                required
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-550 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="1234567890"
                required
              />
            </div>

            {/* Password Field */}
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
                placeholder="*****"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-550 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="*****"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-550 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-white dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-500 dark:text-gray-600">
                    I agree to the terms and conditions
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign up
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
