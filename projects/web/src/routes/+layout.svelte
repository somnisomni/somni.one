<svelte:window on:scroll={ onWindowScroll }
               on:load={ onWindowScroll } />

<div id="name-header">
  <div class="rotate-wrap">
    <noscript>
      <h1 class="name">somni</h1>
    </noscript>

    <div class="route-container">
      {#each routeStack as route (route)}
        <h1 class="route"
            out:fade={{ duration: 100 }}
            animate:flip={{ duration: 1000, easing: quartOut }}
            use:setUpRouteElement>
          <div>{ route.length > 0 ? route : "somni" }</div>
        </h1>
      {/each}
    </div>
  </div>

  <div class="site-features-container">
    <NavColorModeChanger />
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
import { flip } from "svelte/animate";
import { quartOut } from "svelte/easing";
import { fade } from "svelte/transition";
import { onMount } from "svelte";
import NavColorModeChanger from "$/components/NavColorModeChanger.svelte";

const { children }: LayoutProps = $props();
const routeStack: string[] = $derived(page.route.id === "/" ? [""] : (page.route.id?.split("/") ?? [""]));

function setUpRouteElement(node: HTMLElement) {
  const split = SplitText.create(node.querySelector("div"), { type: "chars" });
  gsap.fromTo(split.chars.reverse(),
    { x: 20, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.5, stagger: 0.075, ease: "power2.out" });
}

function onWindowScroll() {
  if(window.scrollY <= 10) document.documentElement.classList.add("current-scroll-top");
  else document.documentElement.classList.remove("current-scroll-top");
}

onMount(() => {
  onWindowScroll();
});
</script>

<style lang="scss">
@reference "$/styles/app.css";

:root {
  --header-size: 6rem;

  @variant max-md {
    --header-size: 4rem;
  }
}

#name-header {
  @apply select-none;
  @apply flex flex-col justify-start items-end fixed h-full w-(--header-size) bottom-0 left-0 top-0 overflow-hidden pt-12 z-5;
  @apply bg-primary text-background;
  @apply transition-[background-color] duration-500;
  @apply /* < md */ max-md:bottom-[unset] max-md:bg-primary/80 max-md:backdrop-blur-md max-md:pt-0 max-md:justify-end max-md:right-0 max-md:h-(--header-size) max-md:w-full max-md:z-20;

  :global(.current-scroll-top) & {
    @apply max-md:bg-primary;
  }

  .rotate-wrap {
    @apply flex flex-row items-end;
    @apply translate-x-3 text-nowrap whitespace-nowrap;
    @apply /* < md */ max-md:translate-x-0 max-md:translate-y-3;

    writing-mode: sideways-lr;
    letter-spacing: -0.139em;

    @variant max-md {
      writing-mode: initial;
    }

    :global(h1) {
      @apply text-6xl;
    }
  }

  .route-container {
    @apply contents;

    :global(> *) {
      @apply mb-[0.5em];
      @apply /* < md */ max-md:mb-0 max-md:mr-[0.5em];
    }

    :global(> *:not(:last-child)) {
      @apply opacity-50;
    }
  }

  .site-features-container {
    @apply absolute flex flex-col items-center justify-end bottom-0 left-0 right-0;
    @apply /* < md */ max-md:flex-row max-md:justify-center max-md:right-[unset] max-md:top-0;

    & > :global(*) {
      @apply w-(--header-size) h-(--header-size);
    }
  }
}

#main {
  @apply ml-(--header-size);
  @apply /* < md */ max-md:ml-0 max-md:mt-(--header-size);
}
</style>
