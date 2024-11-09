interface Language {
  name: string;
  percentage: number;
  color: string;
}

interface LanguageBarProps {
  languages: Language[];
}

export default function LanguageBar({ languages }: LanguageBarProps) {
  const total = languages.reduce((sum, lang) => sum + lang.percentage, 0);

  return (
    <div className="space-y-2">
      {/* Progress bar */}
      <div className="flex h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
        {languages.map((language) => (
          <div
            key={language.name}
            style={{
              width: `${(language.percentage / total) * 100}%`,
              backgroundColor: language.color,
            }}
            className="first:rounded-l-full last:rounded-r-full"
            title={`${language.name}: ${((language.percentage / total) * 100).toFixed(1)}%`}
          />
        ))}
      </div>

      {/* Language details */}
      <div className="flex flex-wrap gap-3 text-xs">
        {languages.map((language) => (
          <div key={language.name} className="flex items-center gap-1.5">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: language.color }}
            />
            <span className="text-gray-600 dark:text-gray-400">{language.name}</span>
            <span className="text-gray-500 dark:text-gray-500">
              {((language.percentage / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
