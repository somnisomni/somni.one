<div class="item-data-status-chip text-{statusBgColorMap[statusLowerCase]}-900 bg-{statusBgColorMap[statusLowerCase]}-300">
  {$_(`me.common.status.${statusLowerCase}`)}
</div>

<script lang="ts">
import type { ProjectDataBase } from "@somni.one/common";
import { _ } from "svelte-i18n";

const { status }: { status: ProjectDataBase["status"] } = $props();
const statusLowerCase = $derived(status.toLowerCase() as Lowercase<ProjectDataBase["status"]>);

const statusBgColorMap: Record<typeof statusLowerCase, string> = {
  "completed": "green",    // text-green-900  bg-green-300
  "discontinued": "red",   // text-red-900    bg-red-300
  "maintaining": "yellow", // text-yellow-900 bg-yellow-300
  "ongoing": "blue",       // text-blue-900   bg-blue-300
};
</script>

<style scoped>
@reference "$/styles/app.css";

.item-data-status-chip {
  @apply inline-block
         text-xs
         px-2 py-0.5
         rounded-full;
}
</style>
