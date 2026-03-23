<span>
  {#if icon}
    <span class="icon" style="width: {realSize}; height: {realSize};">
      {#if typeof icon === "string"}
        {@html icon}
      {:else}
        {@const Icon = icon}
          <Icon size="auto" />
        {/if}
    </span>
  {/if}

  {#if children}
    <span class="text">
      {@render children()}
    </span>
  {/if}
</span>

<script lang="ts">
import { type Component, type Snippet } from "svelte";

const { children, icon, size }: { children?: Snippet; icon: Component | string; size?: number | string } = $props();
const realSize = $derived(size || (children ? "0.75em" : "1em"));
</script>

<style lang="scss" scoped>
span {
  @apply inline-block indent-0!;
  @apply **:text-current;

  .icon {
    @apply inline-block align-baseline mx-[0.1em];
  }

  .text {
    @apply inline;
  }
}
</style>
