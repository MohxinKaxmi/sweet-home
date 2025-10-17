import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  HomeIcon,
  UserPlusIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  HomeModernIcon,
} from '@heroicons/react/24/outline';

const Header = () => {
  const { currentUser } = useSelector(state => state.user);

  return (
    <nav className="bg-white shadow-sm px-4 py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left: Logo + Brand Name */}
        <Link to="/Home" className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent font-serif font-semibold text-2xl tracking-wide cursor-pointer">
          <HomeModernIcon className="h-7 w-7 text-indigo-600" />
          <span>Sweet Homes</span>
        </Link>

        {/* Center: Search Bar with icon inside */}
        <div className="w-full md:w-1/2 relative">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input type='Search'
            autoComplete='on'
            id='Search'
            name='Search' 
            placeholder="Search properties, locations, agents..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
          />
        </div>

        {/* Right: Navigation Menu */}
        <div className="flex space-x-4 items-center">
          <Link to="/Home" className="no-underline flex items-center text-gray-700 hover:text-indigo-600 transition font-medium text-sm">
            <HomeIcon className="h-5 w-5 mr-1" />
            Home
          </Link>

          <Link to="/About" className="no-underline flex items-center text-gray-700 hover:text-indigo-600 transition font-medium text-sm">
            <InformationCircleIcon className="h-5 w-5 mr-1" />
            About
          </Link>

          {currentUser ? (
            <Link to="/Profile" title={currentUser.username || 'User'}>
              <img
                src={currentUser.avatar || '/default-profile.png'}
                alt={currentUser.username || 'User'}
                className="h-8 w-8 rounded-full object-cover cursor-pointer"
              />
            </Link>
          ) : (
            <Link
              to="/Sign-In"
              className="no-underline flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium text-sm"
            >
              <UserPlusIcon className="h-5 w-5 mr-2" />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
