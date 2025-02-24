import { Octokit } from "octokit";

export function createOctokit(useAuth = false): Octokit {
  return new Octokit({
    auth: (useAuth && typeof import.meta.env.VITE_GITHUB_PAT === "string") ? import.meta.env.VITE_GITHUB_PAT : undefined,
  });
}
