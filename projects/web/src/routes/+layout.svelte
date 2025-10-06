<div id="name-header">
  <div class="name">somni</div>
</div>

<div>
  {@render children?.()}
</div>

<script lang="ts">
import "$/styles/app.css";
import type { LayoutProps } from "./$types";

const { children }: LayoutProps = $props();
</script>
