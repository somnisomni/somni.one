<section id="certifications">
  {#each data.data as item}
    <WorkCertificationItem item={item} />
  {/each}
</section>

<script lang="ts">
import WorkCertificationItem from "$/components/works/items/WorkCertificationItem.svelte";
import type { PageProps } from "./$types";

const { data }: PageProps = $props();
</script>
