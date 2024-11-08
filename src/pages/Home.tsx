import React, { useEffect, useState } from 'react';
import { fetchTrendingRepos } from '../services/githubApi';
import RepoList from '../components/RepoList';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { Repo } from '../types/repo';

const Home: React.FC<{ darkMode: boolean; setDarkMode: (mode: boolean) => void }> = ({
  darkMode,
  setDarkMode,
}) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchTrendingRepos(language, page).then((data) => {
      setRepos(data);
      setLoading(false);
    });
  }, [language, page]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <main className="p-8 bg-lightBg dark:bg-darkBg min-h-screen text-gray-900 dark:text-gray-100 transition-all">
        
        {/* Introduction Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">🌟 GitHub Trending Repositories</h2>
          <p className="text-lg mb-4">
            Discover the most popular repositories on GitHub right now! These trending repositories are sorted based on their stars and are updated daily to bring you the hottest projects in the open-source community. Filter repositories by language to find exactly what you're interested in.
          </p>
        </section>

        {/* Language Filter */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Filter by Language</h3>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
          >
            <option value="">All Languages</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
            <option value="php">PHP</option>
            <option value="ruby">Ruby</option>
            <option value="swift">Swift</option>
            <option value="kotlin">Kotlin</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
        </div>

        {loading ? <Loader /> : <RepoList repos={repos} />}
        
        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg">Page {page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
