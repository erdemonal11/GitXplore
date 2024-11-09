import React, { useEffect, useState } from 'react';
import { fetchTrendingRepos } from '../services/githubApi';
import RepoList from '../components/RepoList';
import Navbar from '../components/Navbar';
import CategoryMenu from '../components/CategoryMenu';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import { Repo } from '../types/repo';
import { Search } from 'lucide-react';

interface HomeProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isCategoryMenuOpen: boolean;
  setIsCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Home({
  darkMode,
  setDarkMode,
  isCategoryMenuOpen,
  setIsCategoryMenuOpen
}: HomeProps) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [favorites, setFavorites] = useState<Repo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadRepos();
    loadFavorites();
  }, [currentPage]);

  const loadRepos = async () => {
    setLoading(true);
    try {
      const { repos, totalCount } = await fetchTrendingRepos('', currentPage);
      setRepos(repos);
      setTotalPages(Math.ceil(totalCount / 12));
    } catch (error) {
      console.error('Error loading repositories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setSearching(true);
      try {
        const { repos, totalCount } = await fetchTrendingRepos(query, 1);
        setRepos(repos);
        setTotalPages(Math.ceil(totalCount / 12));
        setCurrentPage(1);
      } catch (error) {
        console.error('Error searching repositories:', error);
      } finally {
        setSearching(false);
      }
    } else if (query.length === 0) {
      loadRepos();
    }
  };

  const loadFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]') as Repo[];
    setFavorites(savedFavorites);
  };

  const toggleFavorite = (repo: Repo) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.some((fav) => fav.id === repo.id)
        ? prevFavorites.filter((fav) => fav.id !== repo.id)
        : [...prevFavorites, repo];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <div className="flex flex-1">
        <CategoryMenu 
          isOpen={isCategoryMenuOpen} 
          onToggle={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)} 
        />
        <main className={`flex-1 transition-all duration-200 ${isCategoryMenuOpen ? 'ml-80' : 'ml-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Trending Repositories</h1>
            
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Search repositories..."
                className="w-full p-4 pl-12 pr-4 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchQuery}
              />
              <Search className="absolute left-4 top-4 text-gray-400" size={20} />
              {searching && (
                <div className="absolute right-4 top-4">
                  <Loader size={20} />
                </div>
              )}
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader size={40} />
              </div>
            ) : (
              <>
                <RepoList
                  repos={repos}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
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