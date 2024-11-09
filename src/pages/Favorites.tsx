import React, { useEffect, useState } from 'react';
import RepoList from '../components/RepoList';
import Navbar from '../components/Navbar';
import { Repo } from '../types/repo';

const Favorites: React.FC<{ darkMode: boolean; setDarkMode: (mode: boolean) => void }> = ({
  darkMode,
  setDarkMode,
}) => {
  const [favorites, setFavorites] = useState<Repo[]>([]);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  useEffect(() => {
    const savedRepos = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedRepos);
  }, []);

  const toggleFavorite = (repo: Repo) => {
    const newFavorites = favorites.filter((fav) => fav.id !== repo.id);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={() => setDarkMode(!darkMode)} 
        onOpenCategoryMenu={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)} 
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          ⭐ Favorite Repositories
        </h1>
        {favorites.length > 0 ? (
          <RepoList repos={favorites} favorites={favorites} onToggleFavorite={toggleFavorite} />
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No favorites yet! Bookmark some repositories from the Trending page.
          </p>
        )}
      </main>
    </div>
  );
};

export default Favorites;
