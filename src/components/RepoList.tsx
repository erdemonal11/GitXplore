import React from 'react';
import RepoCard from './RepoCard';
import { Repo } from '../types/repo';

interface RepoListProps {
  repos: Repo[];
  favorites: Repo[];
  onToggleFavorite: (repo: Repo) => void;
}

const RepoList: React.FC<RepoListProps> = ({ repos, favorites, onToggleFavorite }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {repos.map((repo) => (
      <RepoCard
        key={repo.id}
        repo={repo}
        onToggleFavorite={onToggleFavorite}
        isFavorite={favorites.some((fav) => fav.id === repo.id)}
      />
    ))}
  </div>
);

export default RepoList;