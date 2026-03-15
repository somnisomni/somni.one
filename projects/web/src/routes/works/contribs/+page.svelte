<div class="page">
  <ul class="grid gap-4 grid-cols-1 xl:grid-cols-2 min-[128rem]:grid-cols-3"
      style="display: grid-lanes;">
    {#each contributions as contribution, index (index)}
      <li in:fly={{ y: 30, duration: 500, delay: index * 50, easing: quartOut }}>
        <ContributionItem { contribution } />
      </li>
    {/each}
  </ul>
</div>

<footer class="my-4">
  <p class="text-center! text-sm opacity-50 *:[a]:underline">
    { $_("works.contribs.footerGridLanes") }
    | <a href="https://caniuse.com/css-grid-lanes" target="_blank">caniuse.com</a>
    | <a href="https://webkit.org/blog/17660/introducing-css-grid-lanes/" target="_blank">WebKit Blog</a>

    <br />

    <small>Chromium flag: <code>#css-grid-lanes-layout</code></small>
  </p>
</footer>

<script lang="ts">
import type { ContributionDataBase, ContributionOpenSourceData, ContributionTranslationData } from "@somni.one/common";
import ContributionItem from "$/components/works/ContributionItem.svelte";
import Contributions from "@somni.one/common/data/works/contributions/opensource.json";
import Translations from "@somni.one/common/data/works/contributions/translation.json";
import { fly } from "svelte/transition";
import { quartOut } from "svelte/easing";
import { onMount } from "svelte";
import { _ } from "svelte-i18n";

let contributions: ContributionDataBase[] = $state([]);
const computedContributions: ContributionDataBase[] = [
  ...Contributions as ContributionOpenSourceData[],
  ...Translations as ContributionTranslationData[],
].sort((a, b) => a.title.localeCompare(b.title));

onMount(() => {
  contributions = computedContributions;
});
</script>
