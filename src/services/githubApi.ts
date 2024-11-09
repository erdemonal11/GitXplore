import axios from 'axios';
import { Repo } from '../types/repo';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: GITHUB_API_URL,
  headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {},
});

export async function fetchTrendingRepos(
  query: string,
  page: number = 1,
  category?: string,
  subcategory?: string
): Promise<{ repos: Repo[]; totalCount: number }> {
  console.log(`Fetching repos for query: "${query}", page: ${page}, category: "${category}", subcategory: "${subcategory}"`);

  try {
    const searchQuery = buildSearchQuery(category, subcategory);
    const params = new URLSearchParams({
      q: searchQuery,
      sort: 'stars',
      order: 'desc',
      per_page: '12',
      page: page.toString(),
    });

    console.log(`Final search query: ${searchQuery}`);

    const response = await axiosInstance.get(`/search/repositories?${params}`);
    console.log(`API response status: ${response.status}`);
    console.log(`Total results: ${response.data.total_count}`);

    const repos = await Promise.all(
      response.data.items.map(async (repo: Repo) => {
        if (repo.languages_url) {
          try {
            const languagesResponse = await axiosInstance.get(repo.languages_url);
            repo.languages = languagesResponse.data;
          } catch (error) {
            console.error(`Error fetching languages for ${repo.full_name}:`, error);
          }
        }
        return repo;
      })
    );

    return {
      repos,
      totalCount: Math.min(response.data.total_count, 1000),
    };
  } catch (error) {
    console.error('Error fetching repositories:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data);
    }
    throw error;
  }
}

function buildSearchQuery(category?: string, subcategory?: string): string {
  const categoryQueries: Record<string, Record<string, { topic: string; language?: string }>> = {
    'Frontend & UI': {
      React: { topic: 'topic:react', language: 'language:javascript' },
      Vue: { topic: 'topic:vuejs', language: 'language:javascript' },
      Angular: { topic: 'topic:angular', language: 'language:typescript' },
      Svelte: { topic: 'topic:svelte', language: 'language:javascript' },
      'UI Libraries': { topic: 'topic:ui-library', language: 'language:typescript' },
      'CSS Frameworks': { topic: 'topic:css-framework', language: 'language:css' },
    },
    'Backend & APIs': {
      'Node.js': { topic: 'topic:nodejs', language: 'language:javascript' },
      Python: { topic: 'topic:python', language: 'language:python' },
      Ruby: { topic: 'topic:ruby', language: 'language:ruby' },
      Java: { topic: 'topic:java', language: 'language:java' },
      Go: { topic: 'topic:golang', language: 'language:go' },
      PHP: { topic: 'topic:php', language: 'language:php' },
    },
    'AI & ML': {
      'Deep Learning': { topic: 'topic:deep-learning', language: 'language:python' },
      NLP: { topic: 'topic:nlp', language: 'language:python' },
      'Computer Vision': { topic: 'topic:computer-vision', language: 'language:python' },
    },
  };

  let searchQuery = 'stars:>100';

  if (category && subcategory) {
    const subcategoryData = categoryQueries[category]?.[subcategory];
    if (subcategoryData) {
      searchQuery += ` ${subcategoryData.topic}`;
      if (subcategoryData.language) {
        searchQuery += ` ${subcategoryData.language}`;
      }
    } else {
      console.warn(`Subcategory "${subcategory}" not found in category "${category}".`);
    }
  } else if (category) {
    const categoryTopics = Object.values(categoryQueries[category] || {})
      .map((item) => item.topic)
      .join(' ');
    searchQuery += ` ${categoryTopics}`;
  }

  console.log(`Constructed search query: ${searchQuery}`);
  return searchQuery.trim();
}

export async function fetchRepoDetails(owner: string, repo: string): Promise<Repo> {
  try {
    const response = await axiosInstance.get(`/repos/${owner}/${repo}`);
    const repoData = response.data;
    const languagesResponse = await axiosInstance.get(repoData.languages_url);
    repoData.languages = languagesResponse.data;
    return repoData;
  } catch (error) {
    console.error('Error fetching repository details:', error);
    throw error;
  }
}
