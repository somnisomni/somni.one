<article id={`${idPrefix}-${item.id}`}
         class="data-item">
  <div class="data-item-title-area">
    <h2 class="data-item-title">{item.title}</h2>
    {@render nextToTitle?.()}
  </div>
  <summary class="data-item-desc">{@html item.desc}</summary>

  {@render children?.()}
</article>

<script lang="ts">
import type { Snippet } from "svelte";
import type { MeDataBase } from "$/lib/typings/me-data";

const {
  children,
  nextToTitle,
  idPrefix = "item",
  item,
}: { children?: Snippet, nextToTitle?: Snippet, idPrefix: string, item: MeDataBase } = $props();
</script>

<style scoped>
@reference "$/app.css";

.data-item {
  @apply p-4
         border-1;
}

.data-item .data-item-title-area {
  @apply flex
         items-center
         justify-start;
}

:global(.data-item .data-item-title-area > *) {
  @apply mr-2;
}

.data-item .data-item-title {
  @apply text-2xl;
}

.data-item .data-item-desc {
  @apply block;
}
</style>
