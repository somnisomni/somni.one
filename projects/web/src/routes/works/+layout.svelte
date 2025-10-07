<div class="page">
  <div class="title">
    <span class="details">[nn] items</span>
    <h1>Works</h1>
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
