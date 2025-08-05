<a href={data?.url}
   class="inline-block *:mr-1">
  <span class="float-left !mr-2 w-5 h-5">{@html siGithub.svg}</span>
  <span>Commit <span class="font-mono font-medium">{data?.commitHashShort ?? data?.commitHash.slice(0, 7) ?? displayCommit}</span></span>

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
import type { GitHubCommitData } from "@somni.one/common";
import GitChanges from "$/components/works/fragments/GitChanges.svelte";

const { data, displayCommit }: { data: GitHubCommitData, displayCommit?: string } = $props();
</script>
