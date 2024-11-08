import React, { useEffect, useState } from 'react';
import { Repo } from '../types/repo';
import { fetchRepoLanguages, fetchLatestCommit } from '../services/githubApi';
import LanguageBar from './LanguageBar';
import CommitInfo from './CommitInfo';

interface RepoListProps {
  repos: Repo[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => (
  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {repos.map((repo) => (
      <RepoCard key={repo.id} repo={repo} />
    ))}
  </div>
);

const RepoCard: React.FC<{ repo: Repo }> = ({ repo }) => {
  const [languages, setLanguages] = useState<{ [key: string]: number }>({});
  const [latestCommit, setLatestCommit] = useState<any>(null);

  useEffect(() => {
    fetchRepoLanguages(repo.full_name).then(setLanguages);
    fetchLatestCommit(repo.full_name).then(setLatestCommit);
  }, [repo.full_name]);

  return (
    <div className="p-4 bg-lightCard dark:bg-darkCard rounded-lg shadow hover:scale-105 transition">
      <h2 className="text-xl font-bold mb-2">{repo.name}</h2>
      <p className="text-sm mb-4">{repo.description || 'No description available.'}</p>
      <p>⭐ {repo.stargazers_count}</p>
      {Object.keys(languages).length > 0 && <LanguageBar languages={languages} />}
      {latestCommit && (
        <CommitInfo
          commitMessage={latestCommit.commit.message}
          commitDate={latestCommit.commit.committer.date}
        />
      )}
    </div>
  );
};

export default RepoList;
  