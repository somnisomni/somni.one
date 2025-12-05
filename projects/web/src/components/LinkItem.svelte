<LinkAnchor { linkId }>
  <div class="link-item">
    <span class="name">{ $_(linkItem.labelKey) }</span>
    <span class="userId">{ linkItem.userId }</span>

    <div class="extra-info">
      {@render children?.()}

      <div class="link-icon">
        {#if linkId === "email"}
          {@html faCopy}
        {:else}
          {@html faSquareArrowUp}
        {/if}
      </div>
    </div>
  </div>
</LinkAnchor>

<script lang="ts">
import type { Link } from "$/lib/data/links/links";
import LinkAnchor from "$/components/LinkAnchor.svelte";
import LinkData from "$/lib/data/links/links.json";
import { _ } from "svelte-i18n";
import type { Snippet } from "svelte";
import faCopy from "$assets/icons/fa-copy-solid-full.svg?raw";
import faSquareArrowUp from "$assets/icons/fa-square-arrow-up-right-solid-full.svg?raw";

const { children, linkId }: { children?: Snippet, linkId: string } = $props();

const linkItem = $derived((LinkData as Record<string, Link>)[linkId]);
</script>

<style lang="scss" scoped>
@reference "$/styles/app.css";

.link-item {
  @apply relative flex flex-col justify-center w-full h-full px-6 py-4 border rounded-lg;
  @apply scale-100 border-background-inverse/20 transition-[scale,border-color] duration-200 ease-out;

  &:hover {
    @apply scale-102 border-background-inverse;
    @apply /* < md */ max-md:scale-105;

    &:active {
      @apply scale-101;
      @apply /* < md */ max-md:scale-103;
    }
  }

  .name {
    @apply text-xl font-semibold;
  }

  .userId {
    @apply text-sm font-light;
  }
}

.extra-info {
  @apply absolute right-0 px-[inherit] flex flex-row items-center justify-end text-background-inverse/50 fill-background-inverse/50;

  .link-icon {
    @apply *:w-8 *:h-8 ml-2;
  }
}
</style>
