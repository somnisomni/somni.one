<MeDataItemProjectBase idTargetPrefix="team"
                       item={item}>

</MeDataItemProjectBase>

<script lang="ts">
import MeDataItemProjectBase from "$/components/me/base/MeDataItemProjectBase.svelte";
import type { MeProjectTeamData } from "$/lib/typings/me-data";

const { item }: { item: MeProjectTeamData } = $props();
</script>
