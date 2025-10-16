import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../Components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get loading and error from Redux state
  const { loading, error } = useSelector((state) => state.user);

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission with Redux
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submits during loading

    // Dispatch loading start
    dispatch(signInStart());

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Dispatch success with user data
        dispatch(signInSuccess(data));

        // Redirect after successful login
        setTimeout(() => navigate('/Home'), 1500);
      } else {
        // Dispatch failure with error message
        dispatch(signInFailure(data.message || 'Login failed. Please check your credentials.'));
      }
    } catch (err) {
      console.error('Error during signin:', err);
      dispatch(signInFailure('Something went wrong. Please try again.'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-md max-w-md w-full p-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          Sign in to your account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              value={formData.email}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              required
              autoComplete="email" 
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              value={formData.password}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              required
              autoComplete="current-password" 
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold transition duration-300 ${
              loading
                ? 'bg-blue-400 cursor-not-allowed text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <OAuth />
        </form>

        {/* Show error message */}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/Sign-Up" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
