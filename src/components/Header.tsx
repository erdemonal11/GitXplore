import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => (
  <header className="flex flex-wrap items-center justify-between p-5 bg-lightBg dark:bg-darkBg shadow-md transition-all">
    <div className="flex items-center space-x-2 mb-4 sm:mb-0">
      <FaGithub className="text-2xl text-accent" />
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">GitHub Trending</h1>
    </div>
    <nav className="flex space-x-4">
    
      <Link
        to="/favorites"
        className="text-lg text-gray-900 dark:text-textDark hover:text-accent transition-all"
      >
        Favorites ⭐
      </Link>
      <button
        onClick={toggleDarkMode}
        className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full focus:outline-none"
      >
        {darkMode ? '🌞' : '🌙'}
      </button>
    </nav>
  </header>
);

export default Header;
