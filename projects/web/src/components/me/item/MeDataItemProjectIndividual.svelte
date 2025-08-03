<MeDataItemProjectBase idTargetPrefix="individual"
                       item={item}>

</MeDataItemProjectBase>

<script lang="ts">
import MeDataItemProjectBase from "$/components/me/item/base/MeDataItemProjectBase.svelte";
import type { ProjectIndividualData } from "@somni.one/common";

const { item }: { item: ProjectIndividualData } = $props();
</script>
