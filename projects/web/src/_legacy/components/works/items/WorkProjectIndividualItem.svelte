<WorkProjectItemBase idTargetPrefix="individual"
                     item={item} />

<script lang="ts">
import WorkProjectItemBase from "$/components/works/items/base/WorkProjectItemBase.svelte";
import type { ProjectIndividualData } from "@somni.one/common";

const { item }: { item: ProjectIndividualData } = $props();
</script>
