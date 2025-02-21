<MeDataItemBase idPrefix="contribution-opensource"
                item={item}>
  <ul>
    {#each item.contributions as contribution}
      <li>
        {#if contribution.pullRequest}
          <a>#{contribution.pullRequest}</a>
        {:else if contribution.directCommit}
          <a>hash {contribution.directCommit}</a>
        {/if}

        <span>: {contribution.desc}</span>
      </li>
    {/each}
  </ul>
</MeDataItemBase>

<script lang="ts">
import MeDataItemBase from "$/components/me/MeDataItemBase.svelte";
import type { MeContributionOpenSourceData } from "$/lib/typings/me-data";

const { item }: { item: MeContributionOpenSourceData } = $props();
</script>
