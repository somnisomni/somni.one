import type DataCollectorBase from "../collectors/base";
import type { ContributionOpenSourceData, ContributionTranslationData } from "@somni.one/common";
import { sliceGitHubRepoUrl } from "@somni.one/common";
import GitHubCommitDataCollector from "../collectors/github-commit";
import GitHubPullRequestDataCollector from "../collectors/github-pull-request";

/* eslint-disable @typescript-eslint/no-explicit-any */
type TargetGetterMapItem = {
  dataLoader(): Promise<Array<Record<string, any>>>;
  targetGetter(data: Record<string, any>): Promise<Array<DataCollectorBase | null> | null>;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

const targetGetterMap: TargetGetterMapItem[] = [
  /* contributions_opensource.json - GitHub PRs & Commits */
  {
    async dataLoader() {
      return (await import("@somni.one/common/data/works/contributions_opensource.json")).default as ContributionOpenSourceData[];
    },
    async targetGetter(data) {
      const dataTyped = data as ContributionOpenSourceData;

      if(!dataTyped.repositoryUrl || !dataTyped.contributions || dataTyped.contributions.length <= 0) {
        return null;
      }

      const githubRepoInfo = sliceGitHubRepoUrl(dataTyped.repositoryUrl);
      if(!githubRepoInfo) {
        return null;
      }

      return dataTyped.contributions.map((contrib) => {
        switch(contrib.type) {
          case "pull-request":
            return new GitHubPullRequestDataCollector(githubRepoInfo.owner, githubRepoInfo.repo, contrib.pr);
          case "direct-commit":
            return new GitHubCommitDataCollector(githubRepoInfo.owner, githubRepoInfo.repo, contrib.commit);
          default:
            return null;
        }
      });
    },
  },

  /* contributions_translation.json - GitHub PRs & Commits */
  {
    async dataLoader() {
      return (await import("@somni.one/common/data/works/contributions_translation.json")).default as ContributionTranslationData[];
    },
    async targetGetter(data) {
      const dataTyped = data as ContributionTranslationData;

      if(!dataTyped.repositoryUrl || !dataTyped.contributions || dataTyped.contributions.length <= 0) {
        return null;
      }

      const githubRepoInfo = sliceGitHubRepoUrl(dataTyped.repositoryUrl);
      if(!githubRepoInfo) {
        return null;
      }

      return dataTyped.contributions.map((contrib) => {
        switch(contrib.type) {
          case "pull-request":
            return new GitHubPullRequestDataCollector(githubRepoInfo.owner, githubRepoInfo.repo, contrib.pr);
          case "direct-commit":
            return new GitHubCommitDataCollector(githubRepoInfo.owner, githubRepoInfo.repo, contrib.commit);
          default:
            return null;
        }
      });
    },
  },
];

export async function getCollectTargets(): Promise<DataCollectorBase[]> {
  const targets: DataCollectorBase[] = [];

  for(const item of targetGetterMap) {
    const { dataLoader, targetGetter } = item;
    const rawData = await dataLoader();

    for(const data of rawData) {
      const collectors = (await targetGetter(data))?.filter(c => !!c);

      if(collectors && collectors.length > 0) {
        targets.push(...collectors);
      }
    }
  }

  return targets;
}
