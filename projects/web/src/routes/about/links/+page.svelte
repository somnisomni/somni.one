<div class="page">
  {#each Object.values(linkGroupData) as linkGroup, index (linkGroup.labelKey)}
    <section class="link-group"
             in:fly={{ y: 100, duration: 1000, delay: index * 100, easing: quartOut }}>
      <h1 class="text-2xl! text-accent font-light! mb-4">:: { $_(linkGroup.labelKey) }</h1>

      <div class="link-group-items">
        {#each linkGroup.items as linkId}
          <LinkItem { linkId } />
        {/each}
      </div>
    </section>
  {/each}
</div>

<script lang="ts">
import type { LinkGroup } from "$/lib/data/links/links";
import LinkGroupData from "$/lib/data/links/link-groups.json";
import { _ } from "svelte-i18n";
import LinkItem from "$/components/LinkItem.svelte";
import { fly } from "svelte/transition";
import { quartOut } from "svelte/easing";
import { onMount } from "svelte";

let linkGroupData: Record<string, LinkGroup> = $state({});

onMount(async () => {
  linkGroupData = LinkGroupData as Record<string, LinkGroup>;
});
</script>

<style lang="scss" scoped>
@reference "$/styles/app.css";

.link-group {
  @apply mb-12;

  .link-group-items {
    & > :global(*) {
      @apply w-full h-24 my-2;
    }
  }
}
</style>
