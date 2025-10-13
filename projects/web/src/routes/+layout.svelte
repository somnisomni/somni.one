<div id="name-header">
  <div class="rotate-wrap">
    <noscript>
      <h1 class="name">somni</h1>
    </noscript>

    <div class="route-container">
      {#each routeStack as route (route)}
        <h1 class="route"
            data-route={ route.length > 0 ? route : "somni" }
            use:setUpRouteElement> <!-- animate:flip -->
          <div>{ route.length > 0 ? route : "somni" }</div>
        </h1>
      {/each}
    </div>
  </div>
</div>

<div id="main">
  {@render children?.()}
</div>

<script lang="ts">
import "$/styles/app.css";
import "$lib/init";
import type { LayoutProps } from "./$types";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { page } from "$app/state";
import { fade } from "svelte/transition";
import { flip } from "svelte/animate";

const { children }: LayoutProps = $props();
const routeStack: string[] = $derived(page.route.id === "/" ? [""] : (page.route.id?.split("/") ?? [""]));

function setUpRouteElement(node: HTMLElement) {
  const split = SplitText.create(node.querySelector("div"), { type: "chars" });
  gsap.fromTo(split.chars.reverse(),
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" });
}
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

  .rotate-wrap {
    @apply flex flex-row justify-start items-end;

    letter-spacing: -0.139em;

    .route-container {
      @apply contents;

      :global(> *) {
        @apply ml-[0.5em];
      }

      :global(> *:not(:last-child)) {
        @apply opacity-50;
      }
    }

    :global(h1) {
      @apply text-6xl;
    }
  }
}

#main {
  margin-left: var(--header-size);
}
</style>
