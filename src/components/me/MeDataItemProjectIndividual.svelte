<MeDataItemProjectBase idTargetPrefix="individual"
                       item={item}>

</MeDataItemProjectBase>

<script lang="ts">
import MeDataItemProjectBase from "$/components/me/base/MeDataItemProjectBase.svelte";
import type { MeProjectIndividualData } from "$/lib/typings/me-data";

const { item }: { item: MeProjectIndividualData } = $props();
</script>
