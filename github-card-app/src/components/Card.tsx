import React from "react";
import { FaStar, FaCodeBranch, FaTag, FaUserFriends } from "react-icons/fa";
import { FiUsers, FiBookOpen } from "react-icons/fi";

interface GitHubUser {
  avatar_url: string;
  name: string;
  bio: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  contributions: number; 
}

interface GitHubRepo {
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
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

  // Calculate language percentages
  const getLanguagePercentage = (languages: { [key: string]: number }) => {
    const total = Object.values(languages).reduce((sum, value) => sum + value, 0);
    return Object.entries(languages).map(([language, value]) => ({
      language,
      percentage: ((value / total) * 100).toFixed(1), // Keep one decimal place
    }));
  };

  return (
    <div className={`w-full max-w-md p-6 rounded-lg shadow-lg ${theme.bg} ${theme.text}`}>
      {isRepo ? (
        <>
          <h2 className="text-xl font-bold mb-2">{data.full_name}</h2>
          <p className="text-sm mb-4">{data.description || "No description provided."}</p>
          <div className="flex items-center gap-4 text-sm mb-4">
            <span className={`${theme.accent}`}><FaStar className="inline mr-1" /> {data.stargazers_count} Stars</span>
            <span className={`${theme.accent}`}><FaCodeBranch className="inline mr-1" /> {data.forks_count} Forks</span>
          </div>

          {/* Language Bar Chart */}
          <div className="text-sm mb-4">
            <h3 className="font-semibold mb-2">Languages:</h3>
            <div className="w-full h-3 bg-gray-200 rounded-lg overflow-hidden mb-2">
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

          <div className="text-sm mb-4">
            <h3 className="font-semibold flex items-center gap-1">
              <FaTag className="inline" /> Tags:
            </h3>
            <ul className="list-disc list-inside">
              {data.tags.map((tag) => (
                <li key={tag.name}>{tag.name}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <img src={data.avatar_url} alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-center mb-2">{data.name}</h2>
          <p className="text-sm text-center mb-4">{data.bio || "No bio available."}</p>
          <div className="flex justify-around text-sm mb-4">
            <span className={`${theme.accent}`}><FiUsers className="inline mr-1" /> {data.followers} Followers</span>
            <span className={`${theme.accent}`}><FaUserFriends className="inline mr-1" /> {data.following} Following</span>
            <span className={`${theme.accent}`}><FiBookOpen className="inline mr-1" /> {data.public_repos} Repos</span>
          </div>

          {/* Contributions Count */}
          <div className="text-center text-sm">
            <h3 className="font-semibold">{data.contributions} Contributions in the last year</h3>
          </div>
        </>
      )}
      <a href={data.html_url} target="_blank" rel="noopener noreferrer" className={`block mt-4 text-center ${theme.accent} hover:underline`}>
        View on GitHub
      </a>
    </div>
  );
};

export default Card;
