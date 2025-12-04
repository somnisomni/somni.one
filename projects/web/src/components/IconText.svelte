<span>
  <span class="icon">{@html svg}</span><!--
--><span class="text">{@render children?.()}</span>
</span>

<script lang="ts">
import type { Snippet } from "svelte";

const { children, svg }: { children?: Snippet; svg: string } = $props();
</script>

<style scoped>
span {
  @apply inline-block indent-0!;
  @apply **:text-current **:fill-current;
}

span .icon {
  @apply inline-block align-middle w-[1em] h-[1em] p-[0.1em] mx-[0.1em];
}

span .text {
  @apply inline;
}
</style>
