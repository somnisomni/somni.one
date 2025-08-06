import type { PageServerLoad } from "./$types";
import type { ContributionOpenSourceData } from "@somni.one/common";
import { generateGitHubCommitId, generateGitHubPullRequestId, sliceGitHubRepoUrl } from "@somni.one/common";

export const load: PageServerLoad = async () => {
  // Load data from JSON
  const workData = [ ...(await import("@somni.one/common/data/works/contributions_opensource.json")).default as ContributionOpenSourceData[] ];

  // Sort by title in alphabetical order
  workData.sort((a, b) => a.title.localeCompare(b.title));

  // List up data fetch target IDs
  const workDataFetchTargetIds: string[] = [];
  const fetchDataWorkDataIdMap: Record<string, string> = {};
  for(const item of workData) {
    if(!item.repositoryUrl || !item.contributions || item.contributions.length <= 0) {
      continue;
    }

    const github = sliceGitHubRepoUrl(item.repositoryUrl);
    if(!github) {
      continue;
    }

    for(const contribution of item.contributions) {
      let generatedId: string | undefined;

      if(contribution.type === "pull-request" && contribution.pr) {
        generatedId = generateGitHubPullRequestId(github.owner, github.repo, contribution.pr);
      } else if(contribution.type === "direct-commit" && contribution.commit) {
        generatedId = generateGitHubCommitId(github.owner, github.repo, contribution.commit);
      }

      if(!generatedId) {
        continue;
      }

      workDataFetchTargetIds.push(generatedId);
      fetchDataWorkDataIdMap[generatedId] = item.id;
    }
  }

  // Return data
  return { workData, workDataFetchTargetIds, fetchDataWorkDataIdMap };
};
