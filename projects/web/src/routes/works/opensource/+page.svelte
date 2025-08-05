<section id="contributions-opensource">
  {#each data.data as item}
    <WorkContribOpenSourceItem item={item}
                               commitData={contributionCommitData}
                               prData={contributionPrData} />
  {/each}
</section>

<script lang="ts">
import WorkContribOpenSourceItem from "$/components/works/items/WorkContribOpenSourceItem.svelte";
import { requestGetWorkData } from "$/lib/stores/works.svelte";
import { DataType, type GitHubCommitData, type GitHubPullRequestData, sliceGitHubRepoUrl, generateGitHubPullRequestId, generateGitHubCommitId } from "@somni.one/common";
import { onMount } from "svelte";
import type { PageProps } from "./$types";

const { data }: PageProps = $props();
const contributionCommitData = $state<Record<string, GitHubCommitData>>({});
const contributionPrData = $state<Record<number, GitHubPullRequestData>>({});
const dataFetchTargetIds = $state<string[]>([]);

for(const item of data.data) {
  if(!item.repositoryUrl || !item.contributions || item.contributions.length <= 0) {
    continue;
  }

  const github = sliceGitHubRepoUrl(item.repositoryUrl);
  if(!github) {
    continue;
  }

  for(const contribution of item.contributions) {
    if(contribution.type === "pull-request" && contribution.pr) {
      dataFetchTargetIds.push(generateGitHubPullRequestId(github.owner, github.repo, contribution.pr));
    } else if(contribution.type === "direct-commit" && contribution.commit) {
      dataFetchTargetIds.push(generateGitHubCommitId(github.owner, github.repo, contribution.commit));
    }
  }
}

onMount(async () => {
  const response = await requestGetWorkData(dataFetchTargetIds);

  for(const itemKey in response) {
    const item = response[itemKey];
    if(!item || !item.data) {
      continue;
    }

    switch(item.dataType) {
      case DataType.GitHubCommit:
        const commitData = item.data as GitHubCommitData;
        contributionCommitData[commitData.commitHash] = commitData;
        break;
      case DataType.GitHubPullRequest:
        const prData = item.data as GitHubPullRequestData;
        contributionPrData[prData.pullRequestNumber] = prData;
        break;
      case DataType.Unknown:
      default:
        console.warn(`Unknown data type for item ${itemKey}:`, item.dataType);
        break;
    }
  }
});
</script>
