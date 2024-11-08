import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';
const token = import.meta.env.VITE_GITHUB_TOKEN;

// Fetch trending repositories sorted by recent activity
export const fetchTrendingRepos = async (language = '', page = 1, perPage = 12) => {
  const query = `q=stars:>1${language ? `+language:${language}` : ''}&sort=updated&order=desc`;
  try {
    const response = await axios.get(
      `${GITHUB_API_URL}/search/repositories?${query}&page=${page}&per_page=${perPage}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.items;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
};

// Fetch languages used in a specific repository
export const fetchRepoLanguages = async (repoFullName: string) => {
  try {
    const response = await axios.get(
      `${GITHUB_API_URL}/repos/${repoFullName}/languages`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching repository languages:', error);
    return {};
  }
};

// Fetch the latest commit details
export const fetchLatestCommit = async (repoFullName: string) => {
  try {
    const response = await axios.get(
      `${GITHUB_API_URL}/repos/${repoFullName}/commits`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data[0]; // Return the latest commit
  } catch (error) {
    console.error('Error fetching latest commit:', error);
    return null;
  }
};
