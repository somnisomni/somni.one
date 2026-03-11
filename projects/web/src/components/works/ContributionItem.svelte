<div class="contribution-item p-4 border border-background-inverse/20 rounded-lg">
  <div class="flex items-center gap-2">
    <span class="text-xl">{@html contribution.title}</span>

    {#if contribution.repositoryUrl}
      <a href={ contribution.repositoryUrl }
         target="_blank"
         class="fill-current w-6 h-6 opacity-50 hover:opacity-100 transition-opacity duration-200">
        {@html faCodeBranch}
      </a>
    {:else if contribution.proofUrl}
      <a href={ contribution.proofUrl }
         target="_blank"
         class="fill-current w-6 h-6 opacity-50 hover:opacity-100 transition-opacity duration-200">
        {@html faArrowUpRightFromSquare}
      </a>
    {/if}

    <ContributionWorkTagList { contribution } />
  </div>
</div>

<script lang="ts">
import type { ContributionDataBase } from "@somni.one/common";
import ContributionWorkTagList from "$/components/works/tags/ContributionWorkTagList.svelte";
import faCodeBranch from "$assets/icons/fa-code-branch-solid-full.svg?raw";
import faArrowUpRightFromSquare from "$assets/icons/fa-arrow-up-right-from-square-solid-full.svg?raw";

const { contribution }: { contribution: ContributionDataBase } = $props();
</script>
