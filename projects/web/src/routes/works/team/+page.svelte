<section id="projects-team">
  {#each data.data as item}
    <WorkProjectTeamItem item={item} />
  {/each}
</section>

<script lang="ts">
import WorkProjectTeamItem from "$/components/works/items/WorkProjectTeamItem.svelte";
import type { PageProps } from "./$types";

const { data }: PageProps = $props();
</script>

<style>
/* tailwindcss ditto: 'text-red-300' */
</style>
