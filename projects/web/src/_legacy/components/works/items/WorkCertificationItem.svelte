<WorkItemBase idPrefix="certification"
                item={item}>
  {#snippet nextToTitle()}
    {#if item.certificationYear}
      <WorkYearRange from={item.certificationYear}
                       to={item.certificationYear} />
    {/if}
  {/snippet}

  {#if item.subCertifications}
    {#each item.subCertifications as subCert}
      <p>{@html subCert.title} - {subCert.certificationYear}</p>
    {/each}
  {/if}
</WorkItemBase>

<script lang="ts">
import WorkYearRange from "$/components/works/fragments/WorkYearRange.svelte";
import WorkItemBase from "$/components/works/items/base/WorkItemBase.svelte";
import type { CertificationData } from "@somni.one/common";

const { item }: { item: CertificationData } = $props();
</script>
