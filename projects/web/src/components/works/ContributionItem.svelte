<div class="contribution-item p-4 border border-background-inverse/20 rounded-lg">
  <div class="flex flex-row items-center gap-2">
    <span class="text-xl">{@html contribution.title}</span>

    <div class="flex flex-row justify-end items-center grow shrink-0 gap-2">
      <ContributionWorkTagList { contribution } />

      {#if contribution.repositoryUrl}
        <a href={ contribution.repositoryUrl }
          target="_blank"
          class="contribution-item-link">
          {@html faCodeBranch}
        </a>
      {:else if contribution.proofUrl}
        <a href={ contribution.proofUrl }
          target="_blank"
          class="contribution-item-link">
          {@html faArrowUpRightFromSquare}
        </a>
      {/if}
    </div>
  </div>
</div>

<script lang="ts">
import type { ContributionDataBase } from "@somni.one/common";
import ContributionWorkTagList from "$/components/works/tags/ContributionWorkTagList.svelte";
import faCodeBranch from "$assets/icons/fa-code-branch-solid-full.svg?raw";
import faArrowUpRightFromSquare from "$assets/icons/fa-arrow-up-right-from-square-solid-full.svg?raw";

const { contribution }: { contribution: ContributionDataBase } = $props();
</script>

<style lang="scss">
.contribution-item-link {
  @apply fill-current w-6 h-6 opacity-50 hover:opacity-100 transition-opacity duration-200;
}
</style>
