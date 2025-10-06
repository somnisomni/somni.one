<section id="contributions-opensource">
  {#each data.workData as item}
    <WorkContribOpenSourceItem item={item}
                               commitData={contributionCommitData[item.id]}
                               prData={contributionPrData[item.id]} />
  {/each}
</section>

<script lang="ts">
import WorkContribOpenSourceItem from "$/components/works/items/WorkContribOpenSourceItem.svelte";
import { requestGetData } from "$/lib/stores/works.svelte";
import { DataType, type GitHubCommitData, type GitHubPullRequestData } from "@somni.one/common";
import { onMount } from "svelte";
import type { PageProps } from "./$types";

const { data }: PageProps = $props();
const contributionCommitData = $state<Record<string, Record<string, GitHubCommitData>>>({});
const contributionPrData = $state<Record<string, Record<number, GitHubPullRequestData>>>({});

onMount(async () => {
  await fetchContributionData();
});

async function fetchContributionData() {
  const response = await requestGetData(data.workDataFetchTargetIds);

  for(const itemKey in response) {
    const item = response[itemKey];
    if(!item || !item.data) {
      continue;
    }

    const targetWorkId = data.fetchDataWorkDataIdMap[itemKey];
    if(!contributionCommitData[targetWorkId]) contributionCommitData[targetWorkId] = {};
    if(!contributionPrData[targetWorkId])     contributionPrData[targetWorkId] = {};

    switch(item.dataType) {
      case DataType.GitHubCommit:
        const commitData = item.data as GitHubCommitData;
        contributionCommitData[targetWorkId][commitData.commitHash] = commitData;
        break;
      case DataType.GitHubPullRequest:
        const prData = item.data as GitHubPullRequestData;
        contributionPrData[targetWorkId][prData.pullRequestNumber] = prData;
        break;
      case DataType.Unknown:
      default:
        console.warn(`Unknown data type for item ${itemKey}:`, item.dataType);
        break;
    }
  }
}
</script>
