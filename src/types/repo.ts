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
  languages?: Record<string, number>;
  latest_commit?: {
    message: string;
    date: string;
  };
}