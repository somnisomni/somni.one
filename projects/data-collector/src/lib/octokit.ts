import { Octokit } from "octokit";

export function createOctokit(useAuth = false): Octokit {
  return new Octokit({
    auth: (useAuth && process.env.GITHUB_PAT) ? process.env.GITHUB_PAT : undefined,
  });
}
