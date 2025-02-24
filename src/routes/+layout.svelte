<main>
  {@render children()}
</main>

<script lang="ts">
import "$/styles/app.css";
import type { LayoutProps } from "./$types";

const { children }: LayoutProps = $props();
</script>
