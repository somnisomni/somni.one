<a href={prData?.url}
   class="inline-block *:mr-1">
  <span class="float-left !mr-2 w-5 h-5">{@html siGithub.svg}</span>
  <span>PR <span class="font-mono font-medium">#{pullRequestNumber}</span></span>

  {#if prData}
    <MeDataGitChangesFragment changes={prData.changes} />
    <span class="text-xs text-zinc-300">{prData.title}</span>
  {/if}
</a>

<script lang="ts">
import MeDataGitChangesFragment from "$/components/me/fragments/MeDataGitChangesFragment.svelte";
import { githubDataFetchQueue, githubPullRequestDataStore } from "$/lib/stores/me.svelte";
import { GitHubDataResponseType, type GitHubDataResponse, type GitHubPullRequestData } from "$/lib/typings/github";
import type { MeDataType } from "$/lib/typings/me-data";
import { siGithub } from "simple-icons";
import { onMount } from "svelte";

const { dataType, dataId, pullRequestNumber }: { dataType: MeDataType, dataId: string, pullRequestNumber: number } = $props();

const apiUrl = $derived("/me/api/github"
  + `?type=${dataType}`
  + `&id=${dataId}`
  + `&pr=${pullRequestNumber}`);
const prData = $derived(apiUrl in githubPullRequestDataStore ? githubPullRequestDataStore[apiUrl] : null);

onMount(() => {
  if(prData) return;

  githubDataFetchQueue.add(
    apiUrl,
    async () => await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }),
    async (response) => {
      const data = await response.json() as GitHubDataResponse;

      if(data && data.type === GitHubDataResponseType.PullRequest) {
        githubPullRequestDataStore[apiUrl] = data.data;
      }
    }
  );
});
</script>
