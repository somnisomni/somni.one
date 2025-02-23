<MeDataItemBase idPrefix="project-individual"
                item={item}>
  {#snippet nextToTitle()}
    <MeDataStatusChip status={item.status} />

    <MeDataYearRange from={item.yearFrom}
                     to={item.yearTo} />
  {/snippet}

  {#each item.stacks as stack}
    <MeDataStackIcon stack={stack} />
  {/each}
</MeDataItemBase>

<script lang="ts">
import MeDataItemBase from "$/components/me/MeDataItemBase.svelte";
import MeDataStackIcon from "$/components/me/MeDataStackItem.svelte";
import MeDataStatusChip from "$/components/me/MeDataStatusChip.svelte";
import MeDataYearRange from "$/components/me/MeDataYearRange.svelte";
import type { MeProjectIndividualData } from "$/lib/typings/me-data";

const { item }: { item: MeProjectIndividualData } = $props();
</script>
