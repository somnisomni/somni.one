<div class="main-page">
  {#each data as item}
    <DomainItem data={ item } />
  {/each}
</div>

<script lang="ts">
import DomainItem from "$components/DomainItem.svelte";
import type { DomainItemData } from "$lib/types";

const data: DomainItemData[] = [
  {
    title: [
      { text: "somni", description: "my nickname" },
      { text: "." },
      { text: "one", description: "i'm the one" },
    ],
    href: "https://somni.one",
    subdomains: [
      {
        title: "> whoami",
        href: "https://somni.one/me",
      },
      {
        title: "> blog",
        href: "https://log.somni.one",
      },
    ],
  },
  {
    title: [
      { text: "koharu", description: "one of my favorite character", forceColor: "#DEA0AC" },
      { text: "." },
      { text: "dev", description: "my dev space" },
    ],
    href: "https://koharu.dev",
  },
  {
    title: [
      { text: "miku", description: "you know who she is", forceColor: "#39C5BB" },
      { text: "." },
      { text: "party", description: "just one of available TLDs" },
    ],
    href: "https://miku.party",
  },
];
</script>

<style lang="scss">
.main-page {
  width: 100%;
  min-height: 100vh;
}
</style>
