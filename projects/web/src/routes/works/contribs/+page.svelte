<div class="page">
  <ul class="grid grid-cols-1 xl:grid-cols-2 min-[128rem]:grid-cols-3 gap-4">
    {#each contributions as contribution}
      <li>
        <ContributionItem { contribution } />
      </li>
      <!-- <div class="flex flex-row mb-8 gap-4">
        <div class="flex flex-col justify-center">
          <p class="text-3xl font-medium">{@html contribution.title}</p>
          <p class="text-lg font-light">{@html contribution.desc}</p>
        </div>
      </div> -->
    {/each}
  </ul>
</div>

<script lang="ts">
import type { ContributionDataBase, ContributionOpenSourceData, ContributionTranslationData } from "@somni.one/common";
import ContributionItem from "$/components/works/ContributionItem.svelte";
import Contributions from "@somni.one/common/data/works/contributions/opensource.json";
import Translations from "@somni.one/common/data/works/contributions/translation.json";

const contributions: ContributionDataBase[] = [
  ...Contributions as ContributionOpenSourceData[],
  ...Translations as ContributionTranslationData[],
].sort((a, b) => a.title.localeCompare(b.title));
</script>
