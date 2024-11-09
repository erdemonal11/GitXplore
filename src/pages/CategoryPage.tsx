import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RepoList from '../components/RepoList';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import { fetchTrendingRepos } from '../services/githubApi';
import { Repo } from '../types/repo';

interface CategoryPageProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

export default function CategoryPage({ darkMode, setDarkMode }: CategoryPageProps) {
  const { category } = useParams<{ category: string }>();
  const decodedCategory = decodeURIComponent(category || '');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Repo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchTrendingRepos(decodedCategory, currentPage).then(({ repos, totalCount }) => {
      setRepos(repos);
      setTotalPages(Math.ceil(totalCount / 12));
      setLoading(false);
    });

    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]') as Repo[];
    setFavorites(savedFavorites);
  }, [decodedCategory, currentPage]);

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
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {decodedCategory} Repositories
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
      </main>
      <Footer />
    </div>
  );
}