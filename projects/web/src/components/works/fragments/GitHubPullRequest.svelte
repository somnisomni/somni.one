<a href={data?.url}
   class="inline-block *:mr-1">
  <span class="float-left !mr-2 w-5 h-5">{@html siGithub.svg}</span>
  <span>PR <span class="font-mono font-medium">#{data?.pullRequestNumber ?? displayPullRequestNumber}</span></span>

  {#if data}
    <GitChanges changes={data.changes} />
    <span class="text-xs text-zinc-300">{data.title}</span>
  {:else}
    <span class="text-xs text-zinc-300">{$_("common.loading")}</span>
  {/if}
</a>

<script lang="ts">
import { siGithub } from "simple-icons";
import { _ } from "svelte-i18n";
import type { GitHubPullRequestData } from "@somni.one/common";
import GitChanges from "$/components/works/fragments/GitChanges.svelte";

const { data, displayPullRequestNumber }: { data: GitHubPullRequestData, displayPullRequestNumber?: number  } = $props();
</script>
