import React from 'react';
import { Star, GitFork, Clock, ExternalLink, Tag } from 'lucide-react';
import { formatRelativeTime } from '../utils/date-formatter';
import LanguageBar from './LanguageBar';
import type { Repo } from '../types/repo';

const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Java: '#b07219',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Dart: '#00B4AB',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Shell: '#89e051',
  Vue: '#41b883',
  Jupyter: '#DA5B0B',
};

interface RepoCardProps {
  repo: Repo;
  onToggleFavorite: (repo: Repo) => void;
  isFavorite: boolean;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, onToggleFavorite, isFavorite }) => {
  const languages = Object.entries(repo.languages || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4)
    .map(([name, percentage]) => ({
      name,
      percentage,
      color: languageColors[name] || '#858585',
    }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-2"
            >
              {repo.name}
              <ExternalLink className="h-4 w-4 flex-shrink-0" />
            </a>
          </h3>
          <button
            onClick={() => onToggleFavorite(repo)}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isFavorite
                ? 'text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900'
                : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 min-h-[3rem]">
          {repo.description || 'No description provided'}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            {repo.stargazers_count.toLocaleString()}
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-4 w-4" />
            {repo.forks_count.toLocaleString()}
          </div>
          <div className="flex items-center gap-1" title={new Date(repo.pushed_at).toLocaleString()}>
            <Clock className="h-4 w-4" />
            {formatRelativeTime(repo.pushed_at)}
          </div>
        </div>

        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {repo.topics.slice(0, 5).map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200 cursor-pointer"
              >
                <Tag className="w-3 h-3 mr-1" />
                {topic}
              </span>
            ))}
          </div>
        )}

        <LanguageBar languages={languages} />
      </div>
      
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center mt-auto">
        <div className="flex items-center gap-2">
          {repo.language ? (
            <>
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: languageColors[repo.language] || '#858585' }}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {repo.language}
              </span>
            </>
          ) : (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              No primary language
            </span>
          )}
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
        >
          View Repo
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default RepoCard;