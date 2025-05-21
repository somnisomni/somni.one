<MeDataItemBase idPrefix="project-{idTargetPrefix}"
                item={item}>
  {#snippet nextToTitle()}
    <div class="data-item-extra">
      <MeDataStatusChip status={item.status} />

      <MeDataYearRange from={item.yearFrom}
                       to={item.yearTo} />
    </div>

    {@render nextToTitleSub?.()}
  {/snippet}

  {@render beforeStacks?.()}

  <div class="data-item-stacks">
    {#each item.stacks as stack}
      <MeDataStackItem stack={stack} />
    {/each}
  </div>

  {@render afterStacks?.()}

  {@render children?.()}
</MeDataItemBase>

<script lang="ts">
import type { Snippet } from "svelte";
import type { MeProjectDataBase } from "$/lib/typings/me-data";
import MeDataStackItem from "$/components/me/fragments/MeDataStackItem.svelte";
import MeDataStatusChip from "$/components/me/fragments/MeDataStatusChip.svelte";
import MeDataYearRange from "$/components/me/fragments/MeDataYearRange.svelte";
import MeDataItemBase from "$/components/me/item/base/MeDataItemBase.svelte";

const {
  children,
  nextToTitle: nextToTitleSub,
  beforeStacks,
  afterStacks,
  idTargetPrefix,
  item,
}: { children?: Snippet, nextToTitle?: Snippet, beforeStacks?: Snippet, afterStacks?: Snippet, idTargetPrefix: string, item: MeProjectDataBase } = $props();
</script>

<style scoped>
@reference "$/styles/app.css";

.data-item-extra {
  @apply flex flex-row items-center justify-start
         !mr-0 max-sm:my-2 *:mx-1;
}

.data-item-stacks {
  @apply my-2 max-sm:text-center;
}
</style>
