<MeDataItemBase idPrefix="project-{idTargetPrefix}"
                item={item}>
  {#snippet nextToTitle()}
    <MeDataStatusChip status={item.status} />

    <MeDataYearRange from={item.yearFrom}
                     to={item.yearTo} />
  {/snippet}

  {#each item.stacks as stack}
    <MeDataStackItem stack={stack} />
  {/each}
</MeDataItemBase>

<script lang="ts">
import MeDataItemBase from "$/components/me/base/MeDataItemBase.svelte";
import MeDataStackItem from "$/components/me/MeDataStackItem.svelte";
import MeDataStatusChip from "$/components/me/MeDataStatusChip.svelte";
import MeDataYearRange from "$/components/me/MeDataYearRange.svelte";
import type { MeProjectDataBase } from "$/lib/typings/me-data";
import type { Snippet } from "svelte";

const {
  children,
  idTargetPrefix,
  item,
}: { children?: Snippet, idTargetPrefix: string, item: MeProjectDataBase } = $props();
</script>
