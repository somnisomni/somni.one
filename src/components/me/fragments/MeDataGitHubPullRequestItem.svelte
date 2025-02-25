<a href={prData?.url}
   class="inline-block *:mr-2">
  <span class="float-left w-6 h-6">{@html siGithub.svg}</span>
  <span>PR #{pullRequestNumber}</span>

  {#if prData}
    <span class="text-zinc-400">{prData.title}</span>
  {/if}
</a>

<script lang="ts">
import { githubPullRequestDataStore } from "$/lib/stores/me.svelte";
import type { GitHubPullRequestData } from "$/lib/typings/github";
import { siGithub } from "simple-icons";
import { onMount } from "svelte";

const { repositoryUrl, pullRequestNumber }: { repositoryUrl: string, pullRequestNumber: number } = $props();

let prData = $state<GitHubPullRequestData | null>(null);

onMount(() => {
  if(prData) return;

  const apiUrl = `/me/api/github/pull-request?repositoryUrl=${repositoryUrl}&pullRequest=${pullRequestNumber}`;

  if(apiUrl in githubPullRequestDataStore) {
    prData = githubPullRequestDataStore[apiUrl];
    return;
  }

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    if(response) {
      prData = await response.json();
      githubPullRequestDataStore[apiUrl] = prData!;
    }
  });
});
</script>
