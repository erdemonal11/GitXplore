export const fetchGitHubData = async (url: string) => {
    const usernameOrRepo = url.replace("https://github.com/", "");
    const isRepo = usernameOrRepo.includes("/");
    const endpoint = isRepo
      ? `https://api.github.com/repos/${usernameOrRepo}`
      : `https://api.github.com/users/${usernameOrRepo}`;
  
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to fetch GitHub data");
      const data = await response.json();
  
      if (isRepo) {
        const [languagesResponse, branchesResponse, tagsResponse] = await Promise.all([
          fetch(`${endpoint}/languages`).then((res) => res.json()),
          fetch(`${endpoint}/branches`).then((res) => res.json()),
          fetch(`${endpoint}/tags`).then((res) => res.json()),
        ]);
  
        return { ...data, languages: languagesResponse, branches: branchesResponse, tags: tagsResponse };
      } else {
        return { ...data, contributions: 351 }; // Placeholder for contributions
      }
    } catch (error) {
      console.error("GitHub API Error:", error);
      return null;
    }
  };
  