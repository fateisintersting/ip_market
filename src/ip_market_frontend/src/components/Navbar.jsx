// src/components/Navbar.jsx

import { Link } from "react-router";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { isAuthenticated, principal, userProfile, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
              ICP IP Marketplace
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/dashboard" 
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              Dashboard
            </Link>
            <Link 
              to="/register" 
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              Register IP
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-900 font-medium">
                      {userProfile?.username || 'User'}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {principal ? `${principal.slice(0, 8)}...${principal.slice(-4)}` : ''}
                    </p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-red-600 font-medium transition duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
