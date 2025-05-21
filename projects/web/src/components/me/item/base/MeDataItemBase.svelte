<article id="{idPrefix}-{item.id}"
         class="data-item"
         style:--color={stringToColor(`dark ${item.title}`)}>
  <div class="data-item-title-area">
    <h2 class="data-item-title">{@html item.title}</h2>

    {@render nextToTitle?.()}
  </div>

  {#if item.desc}
    <summary class="data-item-desc">{@html item.desc}</summary>
  {/if}

  {#if children}
    <div class="data-item-content">
      {@render children?.()}
    </div>
  {/if}
</article>

<script lang="ts">
import type { Snippet } from "svelte";
import type { MeDataBase } from "$/lib/typings/me-data";
import stringToColor from "string-to-color";

const {
  children,
  nextToTitle,
  idPrefix = "item",
  item,
}: { children?: Snippet, nextToTitle?: Snippet, idPrefix: string, item: MeDataBase } = $props();
</script>

<style scoped>
@reference "$/styles/app.css";

.data-item {
  @apply px-4 sm:px-8 py-2 sm:py-6 m-2 sm:m-6 max-sm:my-4
         border-1 border-zinc-400 rounded-2xl shadow-md;

  transform: translateY(0.000001px);
  transition-property: transform, box-shadow, border-color;
  transition-duration: var(--duration-medium);
  transition-timing-function: var(--ease-out-extreme);
}

.data-item:hover {
  @apply shadow-lg;

  border-color: var(--color);
  transform: translateY(-0.25rem);
}

.data-item, .data-item .data-item-content {
  @apply *:block *:my-2;
}

.data-item .data-item-title-area {
  @apply flex flex-col sm:flex-row items-center justify-start
         text-center sm:text-start sm:*:mr-2;
}

.data-item .data-item-title {
  @apply text-2xl font-medium;
}

.data-item .data-item-desc {
  @apply block my-4;
}
</style>
