<MeDataItemBase idPrefix="project-team"
                item={item}>
  {#snippet nextToTitle()}
    <MeDataStatusChip status={item.status} />

    <MeDataYearRange from={item.yearFrom}
                     to={item.yearTo} />
  {/snippet}
</MeDataItemBase>

<script lang="ts">
import MeDataItemBase from "$/components/me/MeDataItemBase.svelte";
import MeDataStatusChip from "$/components/me/MeDataStatusChip.svelte";
import MeDataYearRange from "$/components/me/MeDataYearRange.svelte";
import type { MeProjectTeamData } from "$/lib/typings/me-data";

const { item }: { item: MeProjectTeamData } = $props();

const yearRangeString = $derived(
  item.yearFrom === item.yearTo
    ? item.yearFrom.toString()
    : `${item.yearFrom} ~ ${item.yearTo && item.yearTo > 0 ? item.yearTo : ""}`,
);
</script>
