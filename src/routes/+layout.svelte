<ProgressBar class="text-sky-300" />

<main>
  {@render children()}
</main>

<script lang="ts">
import "$/styles/app.css";
import { ProgressBar } from "@prgm/sveltekit-progress-bar";
import type { LayoutProps } from "./$types";

const { children }: LayoutProps = $props();
</script>
