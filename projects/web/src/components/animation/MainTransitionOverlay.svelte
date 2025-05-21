<div bind:this={ dom }
     class="flex justify-center items-center w-full h-full top-0 right-0 left-0 bottom-0 mix-blend-difference fixed pointer-events-none bg-zinc-50 z-100"
     class:opacity-0={ !unhideByDefault }>
  {@render children?.()}
</div>

<script lang="ts">
import gsap from "gsap";
import type { Snippet } from "svelte";

type Props = {
  children?: Snippet;
  unhideByDefault?: boolean;
};

let { children, unhideByDefault = false }: Props = $props();

let dom: HTMLDivElement | null = null;

export function slideIn(duration = 0.5) {
  const slideInTimeline = gsap.timeline({ paused: true });

  // Setup
  slideInTimeline
    .set(dom, {
      xPercent: -100,
      opacity: 1,
      transformOrigin: "left",
    })
    .to(dom, {
      xPercent: 0,
      ease: "power2.in",
      duration,
    });

  // Play
  slideInTimeline.play();

  // Return
  return slideInTimeline;
}

export function slideOut(duration = 0.5) {
  const slideOutTimeline = gsap.timeline({ paused: true });

  // Setup
  slideOutTimeline
    .set(dom, {
      xPercent: 0,
      opacity: 1,
      transformOrigin: "left",
    })
    .to(dom, {
      xPercent: 100,
      ease: "power2.out",
      duration,
    });

  // Play
  slideOutTimeline.play();

  // Return
  return slideOutTimeline;
}
</script>
