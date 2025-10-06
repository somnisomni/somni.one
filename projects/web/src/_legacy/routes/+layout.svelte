<ProgressBar class="text-sky-300" />

<!-- <nav>
  <a href="/">Home</a>
  <a href="/links">Links</a>
  <a href="https://log.somni.one">Blog</a>
</nav> -->

{#if !loadedTransitionDone}
  <MainTransitionOverlay bind:this={ mainTransitionOverlay }
                         unhideByDefault={ true }>
    <div bind:this={ loadingTextElement }
         class="text-[5vw] tracking-[1vw]">LOADING</div>
  </MainTransitionOverlay>
{/if}

{#if loaded}
  <main>
    {@render children()}
  </main>
{/if}

<script lang="ts">
import "$/styles/app.css";
import "$lib/init";

import { ProgressBar } from "@prgm/sveltekit-progress-bar";
import { waitLocale } from "svelte-i18n";
import { onMount } from "svelte";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import MainTransitionOverlay from "$/components/animation/MainTransitionOverlay.svelte";
import type { LayoutProps } from "./$types";

let loaded = $state(false);
let loadedTransitionDone = $state(false);
let mainTransitionOverlay: MainTransitionOverlay | null = $state(null);
let loadingTextElement: HTMLDivElement | null = $state(null);

const { children }: LayoutProps = $props();

onMount(async () => {
  await waitLocale();

  if(mainTransitionOverlay) {
    const timeline = gsap.timeline({ paused: true });
    const loadingTextSplit = SplitText.create(loadingTextElement, {
      type: "chars",
    });

    timeline
      .to(loadingTextSplit.chars, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.05,
      })
      .call(() => { loaded = true; }, [], "+=0.25")
      .add(mainTransitionOverlay.slideOut(0.66), "+=0.1");

    await timeline.play().then();
  }

  loaded = true;
  loadedTransitionDone = true;
});
</script>

<!-- <style scoped>
@reference "$/styles/app.css";

nav {
  @apply fixed top-0 left-0 right-0 w-full flex flex-row items-center justify-end h-16 px-8 text-xl;
}

nav > a {
  @apply py-2 px-4 ml-4;
}
</style> -->
