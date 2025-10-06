<WorkProjectItemBase idTargetPrefix="team"
                     item={item}>
  {#snippet nextToTitle()}
    <p class="ml-1 text-sm text-zinc-400">
      <span class="hidden sm:inline">— </span>
      <span>{item.association}</span>
    </p>
  {/snippet}
</WorkProjectItemBase>

<script lang="ts">
import WorkProjectItemBase from "$/components/works/items/base/WorkProjectItemBase.svelte";
import type { ProjectTeamData } from "@somni.one/common";

const { item }: { item: ProjectTeamData } = $props();
</script>
