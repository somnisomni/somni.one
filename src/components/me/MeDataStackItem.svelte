<span class="data-item-stack-item"
      style="fill: #{stackData?.colorHex}"
      title="{stackData?.title}">
  {@html stackData?.svg}
</span>

<script lang="ts">
import { getTechStackData, type TechStack } from "$/lib/utils/tech-stacks";

const { stack }: { stack: TechStack } = $props();
const stackData = $derived(getTechStackData(stack));
</script>

<style scoped>
@reference "$/styles/app.css";

.data-item-stack-item {
  @apply inline-block
         w-6 h-6;
}
</style>
