<span class="data-item-stack-item"
      style:fill={stackData?.colorHex ? `#${stackData.colorHex}` : undefined}
      title="{stackData?.title}">
  {@html stackData?.svg}
</span>

<script lang="ts">
import { getTechStackData, type TechStack } from "$/lib/utils/tech-stacks";

const { stack }: { stack?: TechStack } = $props();
const stackData = $derived(stack ? getTechStackData(stack) : null);
</script>

<style scoped>
@reference "$/styles/app.css";

.data-item-stack-item {
  @apply inline-block
         w-6 h-6 mr-1.5;
}

:global(.data-item-stack-item svg) {
  @apply !w-full !h-full;
}
</style>
