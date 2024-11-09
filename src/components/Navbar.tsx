import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Github, Sun, Moon, ArrowLeft } from 'lucide-react';

const Navbar: React.FC<{ darkMode: boolean; toggleDarkMode: () => void }> = ({
  darkMode,
  toggleDarkMode,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Github className="h-8 w-8 text-gray-900 dark:text-white mr-2" />
              <span className="text-2xl font-bold">
                <span className="text-gray-900 dark:text-white">Git</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Xplore</span>
              </span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/'
                      ? 'bg-gray-900 text-white dark:bg-gray-700'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Trending
                </Link>
                <Link
                  to="/favorites"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/favorites'
                      ? 'bg-gray-900 text-white dark:bg-gray-700'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Favorites
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {location.pathname !== '/' && (
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;