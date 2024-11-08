import React from 'react';

interface LanguageBarProps {
  languages: { [key: string]: number };
}

const LanguageBar: React.FC<LanguageBarProps> = ({ languages }) => {
  const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

  if (totalBytes === 0) {
    return <p className="text-gray-500 mt-4">Languages: N/A</p>;
  }

  const languagePercentages = Object.entries(languages).map(([lang, bytes]) => ({
    lang,
    percentage: (bytes / totalBytes) * 100,
    color: getLanguageColor(lang),
  }));

  return (
    <div className="mt-4">
      <div className="flex h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        {languagePercentages.map(({ lang, percentage, color }) => (
          <div
            key={lang}
            style={{ width: `${percentage}%`, backgroundColor: color }}
            title={`${lang}: ${percentage.toFixed(1)}%`}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap text-sm">
        {languagePercentages.map(({ lang, percentage, color }) => (
          <div key={lang} className="flex items-center mr-4">
            <span className="w-3 h-3 inline-block rounded-full mr-2" style={{ backgroundColor: color }}></span>
            {lang}: {percentage.toFixed(1)}%
          </div>
        ))}
      </div>
    </div>
  );
};

const getLanguageColor = (language: string) => {
  const colors: { [key: string]: string } = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Go: '#00ADD8',
    Rust: '#dea584',
    Shell: '#89e051',
    Java: '#b07219',
  };
  return colors[language] || '#cccccc';
};

export default LanguageBar;
