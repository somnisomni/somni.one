<section id="projects-individual">
  {#each data.data as item}
    <MeDataItemProjectIndividual item={item} />
  {/each}
</section>

<script lang="ts">
import MeDataItemProjectIndividual from "$/components/me/MeDataItemProjectIndividual.svelte";
import type { PageProps } from "./$types";

const { data }: PageProps = $props();
</script>
