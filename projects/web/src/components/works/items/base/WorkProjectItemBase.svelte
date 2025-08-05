<WorkItemBase idPrefix="project-{idTargetPrefix}"
                item={item}>
  {#snippet nextToTitle()}
    <div class="data-item-extra">
      <WorkStatusChip status={item.status} />

      <WorkYearRange from={item.yearFrom}
                       to={item.yearTo} />
    </div>

    {@render nextToTitle?.()}
  {/snippet}

  {@render beforeStacks?.()}

  <div class="data-item-stacks">
    {#each item.stacks as stack}
      <WorkStackItem stack={stack} />
    {/each}
  </div>

  {@render afterStacks?.()}

  {@render children?.()}
</WorkItemBase>

<script lang="ts">
import type { Snippet } from "svelte";
import type { ProjectDataBase } from "@somni.one/common";
import WorkItemBase from "$/components/works/items/base/WorkItemBase.svelte";
import WorkStatusChip from "$/components/works/fragments/WorkStatusChip.svelte";
import WorkYearRange from "$/components/works/fragments/WorkYearRange.svelte";
import WorkStackItem from "$/components/works/fragments/WorkStackItem.svelte";

const {
  children,
  nextToTitle,
  beforeStacks,
  afterStacks,
  idTargetPrefix,
  item,
}: { children?: Snippet, nextToTitle?: Snippet, beforeStacks?: Snippet, afterStacks?: Snippet, idTargetPrefix: string, item: ProjectDataBase } = $props();
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
