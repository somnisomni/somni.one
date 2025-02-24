<section id="projects-team">
  {#each data.data as item}
    <MeDataItemProjectTeam item={item} />
  {/each}
</section>

<script lang="ts">
import MeDataItemProjectTeam from "$/components/me/item/MeDataItemProjectTeam.svelte";
import type { PageProps } from "./$types";

const { data }: PageProps = $props();
</script>
