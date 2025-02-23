<section id="contributions-translation">
  {#each data.data as item}
    <MeDataItemContribTranslation item={item} />
  {/each}
</section>

<script lang="ts">
import MeDataItemContribTranslation from "$/components/me/MeDataItemContribTranslation.svelte";
import type { PageProps } from "./$types";

const { data }: PageProps = $props();
</script>
