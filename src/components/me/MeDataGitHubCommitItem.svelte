<a href={commitData?.url}
   class="inline-block *:mr-2">
  <span class="float-left w-6 h-6">{@html siGithub.svg}</span>
  <span>Commit {commitData?.commitHashShort ?? commitHash.slice(0, 7)}</span>

  {#if commitData}
    <span class="text-zinc-400">{commitData.title}</span>
  {/if}
</a>

<script lang="ts">
import { githubCommitDataStore } from "$/lib/stores/me.svelte";
import type { GitHubCommitData } from "$/lib/typings/github";
import { siGithub } from "simple-icons";
import { onMount } from "svelte";

const { repositoryUrl, commitHash }: { repositoryUrl: string, commitHash: string } = $props();

let commitData = $state<GitHubCommitData | null>(null);

onMount(() => {
  if(commitData) return;

  const apiUrl = `/me/api/github/commit?repositoryUrl=${repositoryUrl}&commit=${commitHash}`;

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
    if(response) {
      commitData = await response.json();
      githubCommitDataStore[apiUrl] = commitData!;
    }
  });
});
</script>
