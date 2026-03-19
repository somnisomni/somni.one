import { Octokit } from "octokit";

let octokitInstance: Octokit | null = null;

export function getOctokit(useAuth = false): Octokit {
  if(!octokitInstance) {
    octokitInstance = new Octokit({
      auth: (useAuth && process.env.GITHUB_PAT) ? process.env.GITHUB_PAT : undefined,
    });
  }

  return octokitInstance;
}
