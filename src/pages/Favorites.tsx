import React, { useEffect, useState } from 'react';
import { Repo } from '../types/repo';
import RepoList from '../components/RepoList';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Repo[]>([]);

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const savedRepos = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setFavorites(savedRepos);
  }, []);

  return (
    <main className="p-8 bg-lightBg dark:bg-darkBg min-h-screen text-gray-900 dark:text-gray-100">
      <h2 className="text-3xl font-bold mb-8">⭐ Favorite Repositories</h2>
      {favorites.length > 0 ? (
        <RepoList repos={favorites} />
      ) : (
        <p>No favorites yet! Bookmark some repositories from the Trending page.</p>
      )}
    </main>
  );
};

export default Favorites;
