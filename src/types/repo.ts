export interface Repo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  description: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  license: {
    name: string;
  } | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  language: string;
  languages_url: string;
  languages?: Record<string, number>;
}