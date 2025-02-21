<span class="data-item-stack-icon"
      style="fill: #{iconData?.hex}"
      title="{iconData?.title ?? icon}">
  {@html iconData?.svg ?? icon}
</span>

<script lang="ts">
import * as icons from "simple-icons";
import { slugToVariableName } from "simple-icons/sdk";

const { icon }: { icon: string } = $props();

const target = icons[slugToVariableName(icon.toLowerCase()) as keyof typeof icons];
const iconData = $derived(target && "svg" in target ? target : null);
</script>

<style scoped>
@reference "$/app.css";

.data-item-stack-icon {
  @apply inline-block
         w-6 h-6;
}
</style>
