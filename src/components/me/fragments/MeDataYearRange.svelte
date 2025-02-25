<span class="text-xs text-zinc-400">{yearRangeString}</span>

<script lang="ts">
const { from, to }: { from: number; to?: number } = $props();

const yearRangeString = $derived(
  from === to
    ? from.toString()
    : `${from} ~ ${to && to > 0 ? to : ""}`,
);
</script>
