<a href={commitData?.url}
   class="inline-block *:mr-1">
  <span class="float-left !mr-2 w-5 h-5">{@html siGithub.svg}</span>
  <span>Commit <span class="font-mono font-medium">{commitData?.commitHashShort ?? commitHash.slice(0, 7)}</span></span>

  {#if commitData}
    <MeDataGitChangesFragment changes={commitData.changes} />
    <span class="text-xs text-zinc-300">{commitData.title}</span>
  {:else}
    <span class="text-xs text-zinc-300">{$_("common.loading")}</span>
  {/if}
</a>

<script lang="ts">
import type { MeDataType } from "$/lib/typings/me-data";
import MeDataGitChangesFragment from "$/components/me/fragments/MeDataGitChangesFragment.svelte";
import { githubCommitDataStore, githubDataFetchQueue } from "$/lib/stores/me.svelte";
import { GitHubDataResponseType, type GitHubDataResponse } from "$/lib/typings/github";
import { siGithub } from "simple-icons";
import { onMount } from "svelte";
import { _ } from "svelte-i18n";

const { dataType, dataId, commitHash }: { dataType: MeDataType, dataId: string, commitHash: string } = $props();

const apiUrl = $derived("/works/api/github"
  + `?type=${dataType}`
  + `&id=${dataId}`
  + `&commit=${commitHash}`);
const commitData = $derived(apiUrl in githubCommitDataStore ? githubCommitDataStore[apiUrl] : null);

onMount(() => {
  if(commitData) return;

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

      if(data && data.type === GitHubDataResponseType.Commit) {
        githubCommitDataStore[apiUrl] = data.data;
      }
    }
  );
});
</script>
