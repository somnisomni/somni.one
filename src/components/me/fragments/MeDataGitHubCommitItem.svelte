<a href={commitData?.url ?? commitPseudoUrl}
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
import type { GitHubCommitData } from "$/lib/typings/github";
import { siGithub } from "simple-icons";
import { onMount } from "svelte";

const { repositoryUrl, commitHash }: { repositoryUrl: string, commitHash: string } = $props();

let commitData = $state<GitHubCommitData | null>(null);
const commitPseudoUrl = $derived(`${repositoryUrl}/commit/${commitHash}`);

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
