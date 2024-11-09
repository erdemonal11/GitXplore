import axios, { AxiosRequestConfig } from 'axios';

export interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  archived: boolean;
  disabled: boolean;
  license: {
    key: string;
    name: string;
    url: string;
  } | null;
  topics: string[];
  visibility: string;
  forks: number;
  watchers: number;
  default_branch: string;
  score: number;
  languages_url: string;
  languages?: Record<string, number>;
  latest_commit?: {
    message: string;
    date: string;
  };
}

interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repo[];
}

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers = GITHUB_TOKEN
  ? {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    }
  : {};

const axiosConfig: AxiosRequestConfig = {
  headers,
};

export async function fetchTrendingRepos(
  query: string,
  page: number = 1,
  category?: string,
  subcategory?: string
): Promise<{ repos: Repo[]; totalCount: number }> {
  let searchQuery = '';

  const categoryQueries: Record<string, Record<string, string>> = {
    'Frontend & UI': {
      React: 'topic:react topic:react-components topic:react-hooks language:typescript language:javascript stars:>1000',
      Vue: 'topic:vue topic:vue3 topic:vuejs language:typescript language:javascript stars:>1000',
      'UI Libraries': 'topic:ui-library topic:design-system topic:components stars:>500',
    },
    'Backend & APIs': {
      'Node.js': 'topic:nodejs topic:express topic:fastify stars:>1000',
      Python: 'topic:python topic:django topic:fastapi stars:>1000',
      'API Design': 'topic:api topic:rest-api topic:graphql stars:>500',
    },
    'DevOps & Cloud': {
      Docker: 'topic:docker topic:container topic:kubernetes stars:>1000',
      'CI/CD': 'topic:ci-cd topic:github-actions topic:jenkins stars:>500',
      Cloud: 'topic:aws topic:azure topic:gcp stars:>500',
    },
  };

  if (category && subcategory) {
    searchQuery = categoryQueries[category]?.[subcategory] || `topic:${subcategory.toLowerCase()} stars:>100`;
  }

  if (query) {
    searchQuery = `${searchQuery} ${query}`.trim();
  }

  if (!searchQuery) {
    searchQuery = 'stars:>1000';
  }

  const params = new URLSearchParams({
    q: searchQuery,
    sort: 'stars',
    order: 'desc',
    per_page: '12',
    page: page.toString(),
  });

  try {
    const response = await axios.get<GitHubSearchResponse>(
      `${GITHUB_API_URL}/search/repositories?${params}`,
      axiosConfig
    );

    const reposWithLanguages = await Promise.all(
      response.data.items.map(async (repo: Repo) => {
        if (repo.languages_url) {
          const languagesResponse = await axios.get<Record<string, number>>(repo.languages_url, axiosConfig);
          repo.languages = languagesResponse.data;
        }
        return repo;
      })
    );

    return {
      repos: reposWithLanguages,
      totalCount: Math.min(response.data.total_count, 1000),
    };
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return {
      repos: [],
      totalCount: 0,
    };
  }
}