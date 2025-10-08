<div id="name-header">
  <div class="rotate-wrap">
    <h1 bind:this={headerName}
        class="name">somni</h1>
  </div>
</div>

<div id="main">
  {@render children?.()}
</div>

<script lang="ts">
import "$/styles/app.css";
import "$lib/init";
import type { LayoutProps } from "./$types";
import { onMount } from "svelte";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

const { children }: LayoutProps = $props();
let headerName: HTMLElement;

onMount(() => {
  const headerNameSplit = SplitText.create(headerName, { type: "chars" });

  gsap.fromTo(headerNameSplit.chars.reverse(),
    { x: -20, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" });
});
</script>

<style lang="scss">
@reference "$/styles/app.css";

:root {
  --header-size: 6rem;
}

#name-header {
  @apply select-none pointer-events-none;
  @apply flex flex-col justify-start items-end fixed left-0 top-0 bottom-0 h-full pt-12 overflow-hidden;
  @apply bg-primary text-background;
  // @apply border-r-primary border-r-4 text-primary;

  width: var(--header-size);

  & > * {
    @apply inline-block -rotate-90 translate-x-3 -translate-y-[100%] origin-bottom-right text-nowrap whitespace-nowrap;
  }

  & .rotate-wrap {
    @apply flex flex-row justify-start items-end;

    letter-spacing: -0.139em;

    & > * {
      @apply ml-[0.5em];
    }

    & > *:not(:last-child) {
      @apply opacity-70;
    }
  }

  & .name {
    @apply text-6xl;
  }
}

#main {
  margin-left: var(--header-size);
}
</style>
