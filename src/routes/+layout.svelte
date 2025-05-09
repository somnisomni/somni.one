<ProgressBar class="text-sky-300" />

<!-- <nav>
  <a href="/">Home</a>
  <a href="/links">Links</a>
  <a href="https://log.somni.one">Blog</a>
</nav> -->

{#if loaded}
  <main>
    {@render children()}
  </main>
{:else}
  <div>loading</div>
{/if}

<script lang="ts">
import "$/styles/app.css";
import "$lib/init";

import { ProgressBar } from "@prgm/sveltekit-progress-bar";
import type { LayoutProps } from "./$types";
import { waitLocale } from "svelte-i18n";
import { onMount } from "svelte";

let loaded = $state(false);

const { children }: LayoutProps = $props();

onMount(async () => {
  await waitLocale();

  loaded = true;
});
</script>

<!-- <style scoped>
@reference "$/styles/app.css";

nav {
  @apply fixed top-0 left-0 right-0 w-full flex flex-row items-center justify-end h-16 px-8 text-xl;
}

nav > a {
  @apply py-2 px-4 ml-4;
}
</style> -->
