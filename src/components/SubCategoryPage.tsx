import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RepoList from '../components/RepoList';
import Navbar from '../components/Navbar';
import CategoryMenu from '../components/CategoryMenu';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import { fetchTrendingRepos } from '../services/githubApi';
import { Repo } from '../types/repo';

interface SubCategoryPageProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isCategoryMenuOpen: boolean;
  setIsCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SubCategoryPage({
  darkMode,
  setDarkMode,
  isCategoryMenuOpen,
  setIsCategoryMenuOpen
}: SubCategoryPageProps) {
  const { category, subcategory } = useParams<{ category: string; subcategory: string }>();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Repo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    const query = `${category} ${subcategory}`;
    fetchTrendingRepos(query, currentPage).then(({ repos, totalCount }) => {
      setRepos(repos);
      setTotalPages(Math.ceil(totalCount / 12));
      setLoading(false);
    });

    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]') as Repo[];
    setFavorites(savedFavorites);
  }, [category, subcategory, currentPage]);

  const toggleFavorite = (repo: Repo) => {
    const newFavorites = favorites.some((fav) => fav.id === repo.id)
      ? favorites.filter((fav) => fav.id !== repo.id)
      : [...favorites, repo];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar 
  darkMode={darkMode} 
  toggleDarkMode={() => setDarkMode(!darkMode)} 
  onOpenCategoryMenu={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)} 
/>
      <div className="flex flex-1">
        <CategoryMenu 
          isOpen={isCategoryMenuOpen} 
          onToggle={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)} 
        />
        <main className={`flex-1 transition-all duration-200 ${isCategoryMenuOpen ? 'ml-80' : 'ml-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              {category} / {subcategory}
            </h2>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader size={40} />
              </div>
            ) : (
              <>
                <RepoList repos={repos} favorites={favorites} onToggleFavorite={toggleFavorite} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}