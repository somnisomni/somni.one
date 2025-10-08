<div class="page">
  <div class="title">
    <h1>About Me</h1>
  </div>

  <div class="divider"></div>

  <div class="page-content">
    {@render children?.()}
  </div>
</div>

<script lang="ts">
import type { LayoutProps } from "./$types";

const { children }: LayoutProps = $props();
</script>
