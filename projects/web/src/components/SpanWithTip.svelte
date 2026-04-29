<svelte:element this={ tag ?? "span" }
                class="span-with-tip { notText ? '' : 'text' }"
                style="display: { notText ? 'inline-flex' : 'inline' }"
                title={ tip }>
  {@render children?.()}
</svelte:element>

<script lang="ts">
import type { Snippet } from "svelte";

const { children, tag, tip, notText }: { children?: Snippet, tag?: string, tip?: string, notText?: boolean } = $props();
</script>

<style lang="scss" scoped>
.span-with-tip {
  @apply relative;

  &.text {
    @apply cursor-help border-b border-dashed border-current;
  }

  &::after {
    @apply pointer-events-none absolute left-1/2 -translate-x-1/2 top-[calc(100%+0.5rem)] w-max max-w-xs px-4 py-2;
    @apply text-sm font-light text-background-inverse whitespace-pre-wrap break-keep;
    @apply rounded-lg shadow-md backdrop-blur-md bg-background/50;
    @apply border border-background-inverse/10;
    @apply opacity-0 -translate-y-2 transition-all duration-300 ease-out;
    @apply /* < md */ max-md:fixed max-md:mx-auto max-md:top-[initial] max-md:bottom-4 max-md:left-4 max-md:right-4 max-md:translate-x-0 max-w-[calc(100dvw-2rem)];

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
