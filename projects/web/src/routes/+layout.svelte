<div id="name-header">
  <div class="name-wrap">
    <div class="name">somni</div>
  </div>
</div>

<div id="main">
  {@render children?.()}
</div>

<script lang="ts">
import "$/styles/app.css";
import type { LayoutProps } from "./$types";

const { children }: LayoutProps = $props();
</script>

<style lang="scss">
@reference "$/styles/app.css";

:root {
  --header-size: 6rem;
}

#name-header {
  @apply flex flex-col justify-start items-end fixed left-0 top-0 bottom-0 h-full overflow-hidden;
  // @apply bg-primary text-background;
  @apply border-r-primary border-r-2 text-primary;

  width: var(--header-size);

  & > * {
    @apply inline-block -rotate-90 translate-x-3 origin-bottom-right text-nowrap whitespace-nowrap;
  }

  & .name {
    @apply text-6xl font-extralight;
  }
}

#main {
  @apply p-4;

  margin-left: var(--header-size);
}
</style>
