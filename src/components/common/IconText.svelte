<span>
  <span class="icon">{@html svg}</span><!--
--><span class="text">{@render children?.()}</span>
</span>

<script lang="ts">
import { type Snippet } from "svelte";

type Props = {
  svg: string;
  children?: Snippet;
};

const { svg, children }: Props = $props();
</script>

<style scoped>
span {
  @apply inline-block indent-[0]!;
  @apply **:text-current **:fill-current;
}

span .icon {
  @apply inline-block w-[1em] h-[1em] p-[0.1em] mx-[0.1em];

  vertical-align: middle;
}

span .text {
  @apply inline;
}
</style>
