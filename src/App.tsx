import React, { useState, useEffect } from "react";
import { fetchGitHubData } from "./utils/githubApi";
import Card from "./components/Card";
import ErrorModal from "./components/ErrorModal";

const themes = [
  {
    name: "Default",
    bg: "bg-white",
    text: "text-gray-900",
    accent: "text-indigo-600",
  },
  {
    name: "Tokyo Night",
    bg: "bg-[#1a1b26]",
    text: "text-[#c0caf5]",
    accent: "text-[#7aa2f7]",
  },
  {
    name: "Dracula",
    bg: "bg-[#282a36]",
    text: "text-[#f8f8f2]",
    accent: "text-[#ff79c6]",
  },
  {
    name: "Nord",
    bg: "bg-[#2e3440]",
    text: "text-[#d8dee9]",
    accent: "text-[#81a1c1]",
  },
  {
    name: "React",
    bg: "bg-[#20232a]",
    text: "text-[#61dafb]",
    accent: "text-[#61dafb]",
  },
  {
    name: "GitHub Dark",
    bg: "bg-[#0d1117]",
    text: "text-[#c9d1d9]",
    accent: "text-[#58a6ff]",
  },
  {
    name: "Monokai",
    bg: "bg-[#272822]",
    text: "text-[#f8f8f2]",
    accent: "text-[#a6e22e]",
  },
  {
    name: "Gruvbox Dark",
    bg: "bg-[#282828]",
    text: "text-[#ebdbb2]",
    accent: "text-[#fabd2f]",
  },
  {
    name: "Night Owl",
    bg: "bg-[#011627]",
    text: "text-[#d6deeb]",
    accent: "text-[#82aaff]",
  },
  {
    name: "Cobalt2",
    bg: "bg-[#193549]",
    text: "text-[#ffffff]",
    accent: "text-[#ff9d00]",
  },
  {
    name: "Solarized Light",
    bg: "bg-[#fdf6e3]",
    text: "text-[#657b83]",
    accent: "text-[#268bd2]",
  },
  {
    name: "Gruvbox Light",
    bg: "bg-[#fbf1c7]",
    text: "text-[#3c3836]",
    accent: "text-[#b57614]",
  },
  {
    name: "Atom One Light",
    bg: "bg-[#fafafa]",
    text: "text-[#383a42]",
    accent: "text-[#0184bc]",
  },
  {
    name: "Ayu Light",
    bg: "bg-[#fafafa]",
    text: "text-[#5c6773]",
    accent: "text-[#ff9940]",
  },
];

const App: React.FC = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEmbedMode, setIsEmbedMode] = useState(false);
  const [embedCode, setEmbedCode] = useState<string | null>(null); // Add this line

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsEmbedMode(params.get("embed") === "true");
    if (params.get("url")) setUrl(params.get("url")!);
  }, []);

  const handleFetch = async () => {
    setError(null);
    if (!/^https:\/\/github\.com\/[\w-]+(\/[\w-]+)?$/.test(url)) {
      setError("Please enter a valid GitHub profile or repo URL.");
      return;
    }
    const fetchedData = await fetchGitHubData(url);
    fetchedData ? setData(fetchedData) : setError("Failed to fetch data from GitHub.");
  };

  const generateEmbedCode = () => {
    const embedUrl = `https://git-card-ten.vercel.app/?url=${encodeURIComponent(url)}&embed=true`;
    const iframeCode = `<iframe src="${embedUrl}" width="400" height="300" frameborder="0" style="border:0; overflow:hidden;"></iframe>`;
    setEmbedCode(iframeCode);
    navigator.clipboard.writeText(iframeCode).then(() => {
      alert("Embed code copied to clipboard!");
    });
  };

  useEffect(() => {
    if (url && isEmbedMode) handleFetch();
  }, [url, isEmbedMode]);

  return (
    <div className={`min-h-screen flex flex-col items-center transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {!isEmbedMode && (
        <header className="w-full max-w-2xl p-6 flex flex-col items-center">
          <h1 className="text-5xl font-extrabold mb-8 tracking-wide text-center">GitCard</h1>
          <div className="flex flex-col items-center gap-4 w-full max-w-md">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter GitHub Profile or Repo URL"
              className={`p-3 w-full rounded-lg border focus:outline-none transition duration-300 ${isDarkMode ? "bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-indigo-500" : "bg-white text-gray-900 placeholder-gray-500 border-gray-300 focus:border-indigo-600"}`}
            />
            <button
              onClick={handleFetch}
              className="w-full px-4 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition duration-300 font-semibold text-lg"
            >
              Generate
            </button>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="mt-6 px-4 py-2 text-sm font-semibold rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 transition duration-300"
          >
            Toggle {isDarkMode ? "Light" : "Dark"} Mode
          </button>
        </header>
      )}

      <main className="flex-grow flex flex-col items-center justify-center w-full">
        {data ? (
          <>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Card data={data} theme={selectedTheme} />
            </a>
            {!isEmbedMode && (
              <div className="mt-8">
                <label htmlFor="theme-select" className="block text-sm font-medium mb-2">
                  Select Card Theme
                </label>
                <select
                  id="theme-select"
                  className="p-2 rounded-lg shadow-sm focus:outline-none border bg-gray-100 text-gray-900 border-gray-300"
                  value={selectedTheme.name}
                  onChange={(e) =>
                    setSelectedTheme(
                      themes.find((t) => t.name === e.target.value)!
                    )
                  }
                >
                  {themes.map((theme) => (
                    <option key={theme.name} value={theme.name}>
                      {theme.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={generateEmbedCode}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-500 transition duration-300 font-semibold"
                >
                  Copy Embed Code
                </button>
                {embedCode && (
                  <div className="mt-4 bg-gray-200 p-4 rounded-lg">
                    <p className="text-xs text-gray-700">Embed Code:</p>
                    <pre className="text-xs overflow-x-auto">{embedCode}</pre>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          !isEmbedMode && <p className="text-gray-500 text-lg">Enter a GitHub URL and click Generate to see the card.</p>
        )}
      </main>
      
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
    </div>
  );
};

export default App;