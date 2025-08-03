<MeDataItemProjectBase idTargetPrefix="team"
                       item={item}>
  {#snippet nextToTitle()}
    <p class="ml-1 text-sm text-zinc-400">
      <span class="hidden sm:inline">— </span>
      <span>{item.association}</span>
    </p>
  {/snippet}
</MeDataItemProjectBase>

<script lang="ts">
import MeDataItemProjectBase from "$/components/me/item/base/MeDataItemProjectBase.svelte";
import type { ProjectTeamData } from "@somni.one/common";

const { item }: { item: ProjectTeamData } = $props();
</script>
