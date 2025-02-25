<span class="opacity-50">
  {#if changes.additions}
    <span class="text-green-500">+{changes.additions}</span>
  {/if}

  {#if changes.deletions}
    <span class="text-red-400">-{changes.deletions}</span>
  {/if}
</span>

<script lang="ts">
import type { GitCommitChanges } from "$/lib/typings/github";

const { changes }: { changes: GitCommitChanges } = $props();
</script>
