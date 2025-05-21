<section id="contributions-opensource">
  {#each data.data as item}
    <MeDataItemContribOpenSource item={item} />
  {/each}
</section>

<script lang="ts">
import MeDataItemContribOpenSource from "$/components/me/item/MeDataItemContribOpenSource.svelte";
import type { PageProps } from "./$types";

const { data }: PageProps = $props();
</script>
