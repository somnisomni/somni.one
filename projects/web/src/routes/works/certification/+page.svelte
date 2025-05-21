<section id="certifications">
  {#each data.data as item}
    <MeDataItemCertification item={item} />
  {/each}
</section>

<script lang="ts">
import MeDataItemCertification from "$/components/me/item/MeDataItemCertification.svelte";
import type { PageProps } from "./$types";

const { data }: PageProps = $props();
</script>
