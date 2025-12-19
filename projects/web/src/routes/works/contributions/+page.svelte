<div class="page">
  {#each contributions as contribution}
    <div class="flex flex-row mb-8 gap-4">
      <div class="flex flex-col justify-center">
        <p class="text-3xl font-medium">{@html contribution.title}</p>
        <p class="text-lg font-light">{@html contribution.desc}</p>
      </div>
    </div>
  {/each}
</div>

<script lang="ts">
import type { ContributionOpenSourceData } from "@somni.one/common";
import Contributions from "@somni.one/common/data/works/contributions/opensource.json";

const contributions = Contributions as ContributionOpenSourceData[];
</script>
