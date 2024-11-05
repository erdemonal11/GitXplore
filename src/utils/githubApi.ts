const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const fetchGitHubData = async (url: string) => {
  const usernameOrRepo = url.replace("https://github.com/", "");
  const isRepo = usernameOrRepo.includes("/");
  const endpoint = isRepo
    ? `https://api.github.com/repos/${usernameOrRepo}`
    : `https://api.github.com/users/${usernameOrRepo}`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch GitHub data");
    const data = await response.json();

    if (isRepo) {
      // Fetch languages, branches, tags, and last commit date
      const [languagesResponse, branchesResponse, tagsResponse, commitsResponse] = await Promise.all([
        fetch(`${endpoint}/languages`).then((res) => res.json()),
        fetch(`${endpoint}/branches`).then((res) => res.json()),
        fetch(`${endpoint}/tags`).then((res) => res.json()),
        fetch(`${endpoint}/commits?per_page=1`).then((res) => res.json()), // Fetch the latest commit
      ]);

      const lastCommitDate = commitsResponse[0]?.commit?.committer?.date || null;

      return {
        ...data,
        languages: languagesResponse,
        branches: branchesResponse,
        tags: tagsResponse,
        watchers_count: data.watchers_count,
        last_commit_date: lastCommitDate,
      };
    } else {
      const contributionsQuery = `
        query ($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }
      `;

      const contributionsResponse = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
        body: JSON.stringify({
          query: contributionsQuery,
          variables: { username: usernameOrRepo },
        }),
      });

      if (!contributionsResponse.ok) throw new Error("Failed to fetch contributions data");

      const contributionsData = await contributionsResponse.json();
      const contributions = contributionsData.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0;

      return {
        ...data,
        contributions, // Set dynamic contributions count
        created_at: data.created_at,
        company: data.company || null,
        location: data.location || null,
      };
    }
  } catch (error) {
    console.error("GitHub API Error:", error);
    return null;
  }
};
