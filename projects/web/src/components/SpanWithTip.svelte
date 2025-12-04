<span class="span-with-tip { notText ? '' : 'text' }"
      style="display: { notText ? 'inline-flex' : 'inline' }"
      title={ tip }>
  {@render children?.()}
</span>

<script lang="ts">
import type { Snippet } from "svelte";

const { children, tip, notText }: { children?: Snippet, tip?: string, notText?: boolean } = $props();
</script>

<style lang="scss">
@reference "$/styles/app.css";

.span-with-tip {
  @apply relative;

  &.text {
    @apply cursor-help border-b border-dashed border-current;
  }

  &::after {
    @apply pointer-events-none absolute left-1/2 top-[110%] -translate-x-1/2 w-max max-w-xs px-4 py-2;
    @apply text-sm font-light text-background-inverse whitespace-pre-wrap;
    @apply rounded-lg shadow-md backdrop-blur-md bg-background/50;
    @apply border border-background-inverse/10;
    @apply opacity-0 -translate-y-2 transition-all duration-300 ease-out;

    content: attr(title);
    z-index: 10;
  }

  &:hover {
    @apply border-solid;

    &::after {
      @apply pointer-events-auto opacity-100 translate-y-0;
    }
  }
}
</style>
