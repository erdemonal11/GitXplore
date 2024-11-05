// src/components/Card.tsx
import React from "react";
import { FaStar, FaCodeBranch, FaTag, FaUserFriends, FaGithub, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FiUsers, FiBookOpen, FiBriefcase, FiCalendar } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";

interface GitHubUser {
  avatar_url: string;
  name: string;
  login: string; // GitHub username
  bio: string | null;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  contributions: number;
  created_at: string;
  company: string | null;
  location: string | null;
}

interface GitHubRepo {
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  last_commit_date: string | null;
  languages: { [key: string]: number };
  branches: Array<{ name: string }>;
  tags: Array<{ name: string }>;
}

type GitHubData = GitHubUser | GitHubRepo;

interface CardProps {
  data: GitHubData;
  theme: { bg: string; text: string; accent: string };
}

const isRepoData = (data: GitHubData): data is GitHubRepo => {
  return (data as GitHubRepo).stargazers_count !== undefined;
};

const languageColors: { [key: string]: string } = {
  JavaScript: "#f1e05a",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Python: "#3572A5",
  TypeScript: "#2b7489",
};

const Card: React.FC<CardProps> = ({ data, theme }) => {
  const isRepo = isRepoData(data);

  const getLanguagePercentage = (languages: { [key: string]: number }) => {
    const total = Object.values(languages).reduce((sum, value) => sum + value, 0);
    return Object.entries(languages).map(([language, value]) => ({
      language,
      percentage: ((value / total) * 100).toFixed(1),
    }));
  };

  return (
    <div className={`w-full max-w-lg p-6 rounded-lg shadow-lg border border-gray-200 ${theme.bg} ${theme.text}`}>
      {isRepo ? (
        <>
          {/* Repository Card */}
          <h2 className="text-xl font-bold mb-2">{data.full_name}</h2>
          <p className="text-sm mb-4 text-gray-600">{data.description || "No description provided."}</p>
          <div className="flex items-center gap-4 text-sm mb-4">
            <span className={`${theme.accent} flex items-center`}><FaStar className="mr-1" /> {data.stargazers_count} Stars</span>
            <span className={`${theme.accent} flex items-center`}><FaCodeBranch className="mr-1" /> {data.forks_count} Forks</span>
            <span className={`${theme.accent} flex items-center`}><FaUserFriends className="mr-1" /> {data.watchers_count} Watching</span>
          </div>

          {/* Last Commit Date */}
          {data.last_commit_date && (
            <div className="text-sm mb-4 flex items-center text-gray-500">
              <FaClock className="mr-2" />
              Last commit {formatDistanceToNow(new Date(data.last_commit_date), { addSuffix: true })}
            </div>
          )}

          {/* Language Bar Chart */}
          <div className="text-sm mb-4">
            <h3 className="font-semibold mb-2">Languages:</h3>
            <div className="w-full h-3 bg-gray-300 rounded-lg overflow-hidden mb-2">
              <div className="flex h-full">
                {getLanguagePercentage(data.languages).map(({ language, percentage }) => (
                  <div
                    key={language}
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: languageColors[language] || "#ccc",
                    }}
                    title={`${language}: ${percentage}%`}
                  />
                ))}
              </div>
            </div>
            <ul className="flex flex-wrap gap-2">
              {getLanguagePercentage(data.languages).map(({ language, percentage }) => (
                <li key={language} className="flex items-center gap-1 text-xs">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: languageColors[language] || "#ccc" }}
                  />
                  {language} {percentage}%
                </li>
              ))}
            </ul>
          </div>

          {/* Tags Section (Conditional) */}
          {data.tags.length > 0 && (
            <div className="text-sm mb-4">
              <h3 className="font-semibold flex items-center gap-1">
                <FaTag className="inline" /> Tags:
              </h3>
              <ul className="flex flex-wrap gap-2">
                {data.tags.map((tag) => (
                  <li key={tag.name} className="bg-gray-200 px-2 py-1 rounded-md">{tag.name}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Profile Card */}
          <div className="flex items-start mb-6">
            {/* Profile Image */}
            <img
              src={data.avatar_url}
              alt="Avatar"
              className="w-24 h-24 rounded-full shadow-md object-cover border-2 border-gray-300"
            />
            
            {/* Profile Info */}
            <div className="ml-6 flex-1">
              <h2 className="text-2xl font-semibold mb-1">
                {data.name} <span className="text-gray-500">({data.login})</span>
              </h2>

              {/* Render bio only if available */}
              {data.bio && <p className="text-sm text-gray-600 mb-4">{data.bio}</p>}

              {/* Followers, Following, Repos */}
              <div className="flex gap-6 text-sm">
                <span className={`${theme.accent} flex items-center`}><FiUsers className="mr-1" /> {data.followers} Followers</span>
                <span className={`${theme.accent} flex items-center`}><FaUserFriends className="mr-1" /> {data.following} Following</span>
                <span className={`${theme.accent} flex items-center`}><FiBookOpen className="mr-1" /> {data.public_repos} Repos</span>
              </div>
            </div>
          </div>

          {/* Centered Company, Location, and Join Date */}
          <div className="text-center text-sm flex justify-center gap-6 items-center text-gray-700 mb-4">
            {data.company && (
              <div className="flex items-center gap-1">
                <FiBriefcase className="text-gray-500" /> {data.company}
              </div>
            )}
            {data.location && (
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-gray-500" /> {data.location}
              </div>
            )}
            <div className="flex items-center gap-1">
              <FiCalendar className="text-gray-500" /> Joined {new Date(data.created_at).getFullYear()}
            </div>
          </div>

          {/* Contributions Count */}
          <div className="text-center mt-4 font-semibold text-gray-700">
            {data.contributions} Contributions in the last year
          </div>
        </>
      )}
      
      {/* View on GitHub Link */}
      <a
        href={data.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${theme.accent} mt-6 flex justify-center items-center gap-2 text-lg font-semibold`}
        style={{ textDecoration: 'none' }}
      >
        <FaGithub size={24} className="mr-2" /> View on GitHub
      </a>
    </div>
  );
};

export default Card;
