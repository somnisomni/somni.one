<div class="page">
  {#each contributions as contribution}
    <div class="flex flex-row mb-8 gap-4">
      <div class="flex flex-col justify-center">
        <p class="text-3xl font-medium">{@html contribution.title}</p>
        <p class="text-lg font-light">{@html contribution.desc}</p>
      </div>
    </div>
  {/each}

  <div class="border-t border-background-inverse h-1 my-12"></div>

  {#each translations as translation}
    <div class="flex flex-row mb-8 gap-4">
      <div class="flex flex-col justify-center">
        <p class="text-3xl font-medium">{@html translation.title}</p>
        <p class="text-lg font-light">{@html translation.desc}</p>
      </div>
    </div>
  {/each}
</div>

<script lang="ts">
import type { ContributionOpenSourceData, ContributionTranslationData } from "@somni.one/common";
import Contributions from "@somni.one/common/data/works/contributions/opensource.json";
import Translations from "@somni.one/common/data/works/contributions/translation.json";

const contributions = (Contributions as ContributionOpenSourceData[]).sort((a, b) => a.title.localeCompare(b.title));
const translations = (Translations as ContributionTranslationData[]).sort((a, b) => a.title.localeCompare(b.title));
</script>
