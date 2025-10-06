<section id="projects-individual">
  {#each data.data as item}
    <WorkProjectIndividualItem item={item} />
  {/each}
</section>

<script lang="ts">
import WorkProjectIndividualItem from "$/components/works/items/WorkProjectIndividualItem.svelte";
import type { PageProps } from "./$types";

const { data }: PageProps = $props();
</script>
