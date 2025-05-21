<MeDataItemBase idPrefix="certification"
                item={item}>
  {#snippet nextToTitle()}
    {#if item.certificationYear}
      <MeDataYearRange from={item.certificationYear}
                       to={item.certificationYear} />
    {/if}
  {/snippet}

  {#if item.subCertifications}
    {#each item.subCertifications as subCert}
      <p>{@html subCert.title} - {subCert.certificationYear}</p>
    {/each}
  {/if}
</MeDataItemBase>

<script lang="ts">
import MeDataYearRange from "$/components/me/fragments/MeDataYearRange.svelte";
import MeDataItemBase from "$/components/me/item/base/MeDataItemBase.svelte";
import type { MeCertificationData } from "$/lib/typings/me-data";

const { item }: { item: MeCertificationData } = $props();
</script>
