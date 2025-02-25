<a href={prData?.url ?? prPseudoUrl}
   class="inline-block *:mr-1">
  <span class="float-left !mr-2 w-5 h-5">{@html siGithub.svg}</span>
  <span>PR <span class="font-mono font-medium">#{pullRequestNumber}</span></span>

  {#if prData}
    <MeDataGitChangesFragment changes={prData.changes} />
    <span class="text-zinc-400">{prData.title}</span>
  {/if}
</a>

<script lang="ts">
import MeDataGitChangesFragment from "$/components/me/fragments/MeDataGitChangesFragment.svelte";
import { githubPullRequestDataStore } from "$/lib/stores/me.svelte";
import type { GitHubPullRequestData } from "$/lib/typings/github";
import { siGithub } from "simple-icons";
import { onMount } from "svelte";

const { repositoryUrl, pullRequestNumber }: { repositoryUrl: string, pullRequestNumber: number } = $props();

let prData = $state<GitHubPullRequestData | null>(null);
const prPseudoUrl = $derived(`${repositoryUrl}/pull/${pullRequestNumber}`);

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
