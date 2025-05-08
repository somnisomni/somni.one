<ProgressBar class="text-sky-300" />

<nav>
  <a href="/">Home</a>
  <a href="/links">Links</a>
  <a href="https://log.somni.one">Blog</a>
</nav>

<main>
  {@render children()}
</main>

<script lang="ts">
import "$/styles/app.css";
import { ProgressBar } from "@prgm/sveltekit-progress-bar";
import type { LayoutProps } from "./$types";

const { children }: LayoutProps = $props();
</script>

<style scoped>
@reference "$/styles/app.css";

nav {
  @apply fixed top-0 left-0 right-0 w-full flex flex-row items-center justify-end h-16 px-8 text-xl;
}

nav > a {
  @apply py-2 px-4 ml-4;
}
</style>
