import { Octokit } from "octokit";

export function createOctokit(useAuth = false): Octokit {
  return new Octokit({
    auth: (useAuth && typeof process.env.GITHUB_PAT === "string") ? process.env.GITHUB_PAT : undefined,
  });
}
