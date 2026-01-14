<div class="scale-animation-on-hover"
     style="--scale: {scale}%;">
  {@render children?.()}
</div>

<script lang="ts">
import type { Snippet } from "svelte";

const { children, scale = 105 }: { children?: Snippet, scale?: number } = $props();
</script>

<style lang="scss" scoped>
.scale-animation-on-hover {
  @apply inline-block;
  @apply transition-transform origin-center duration-250 ease-in-out scale-100;

  &:hover {
    @apply scale-(--scale);
  }
}
</style>
