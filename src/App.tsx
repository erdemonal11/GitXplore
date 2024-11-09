import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import CategoryPage from './pages/CategoryPage';
import SubCategoryPage from './components/SubCategoryPage';
import './index.css';

// Define a common interface for props
interface PageProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isCategoryMenuOpen: boolean;
  setIsCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const pageProps: PageProps = {
    darkMode,
    setDarkMode,
    isCategoryMenuOpen,
    setIsCategoryMenuOpen
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home {...pageProps} />} />
        <Route path="/favorites" element={<Favorites {...pageProps} />} />
        <Route path="/category/:category" element={<CategoryPage {...pageProps} />} />
        <Route path="/category/:category/:subcategory" element={<SubCategoryPage {...pageProps} />} />
      </Routes>
    </Router>
  );
};

export default App;