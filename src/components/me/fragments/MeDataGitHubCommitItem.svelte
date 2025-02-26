<a href={commitData?.url}
   class="inline-block *:mr-1">
  <span class="float-left !mr-2 w-5 h-5">{@html siGithub.svg}</span>
  <span>Commit <span class="font-mono font-medium">{commitData?.commitHashShort ?? commitHash.slice(0, 7)}</span></span>

  {#if commitData}
    <MeDataGitChangesFragment changes={commitData.changes} />
    <span class="text-zinc-400">{commitData.title}</span>
  {/if}
</a>

<script lang="ts">
import MeDataGitChangesFragment from "$/components/me/fragments/MeDataGitChangesFragment.svelte";
import { githubCommitDataStore } from "$/lib/stores/me.svelte";
import { GitHubDataResponseType, type GitHubCommitData, type GitHubDataResponse } from "$/lib/typings/github";
import type { MeDataType } from "$/lib/typings/me-data";
import { siGithub } from "simple-icons";
import { onMount } from "svelte";

const { dataType, dataId, commitHash }: { dataType: MeDataType, dataId: string, commitHash: string } = $props();

let commitData = $state<GitHubCommitData | null>(null);

onMount(() => {
  if(commitData) return;

  const apiUrl = "/me/api/github"
    + `?type=${dataType}`
    + `&id=${dataId}`
    + `&commit=${commitHash}`;

  if(apiUrl in githubCommitDataStore) {
    commitData = githubCommitDataStore[apiUrl];
    return;
  }

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    const data = await response.json() as GitHubDataResponse;

    if(data && data.type === GitHubDataResponseType.Commit) {
      githubCommitDataStore[apiUrl] = commitData = data.data;
    }
  });
});
</script>
