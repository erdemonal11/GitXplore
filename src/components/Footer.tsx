import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-lg mt-auto border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Powered by GitHub API
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/erdemonal11/GitXplore"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-medium">View Source</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;