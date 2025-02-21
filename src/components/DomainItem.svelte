<section class="domain-item"
         bind:this="{ root }"
         onpointerenter={ () => pointerEntered = true }
         onpointerleave={ () => pointerEntered = false }
         onpointermove={ onPointerMove }>
  <div class="title"
       style={ transformStyle }>
    {#each data.title as title}
      <DomainItemTitleSegment seg={ title } />
    {/each}
  </div>
</section>

<script lang="ts">
import type { DomainItemData } from "$lib/types";
import DomainItemTitleSegment from "./DomainItemTitleSegment.svelte";

const { data }: { data: DomainItemData } = $props();

const transformThreshold = 0.1;
let root: HTMLElement | null = null;
let pointerEntered = $state(false);
let transformX = $state(0.0);
let transformY = $state(0.0);
let transformStyle = $state("");

$effect(() => {
  if(!pointerEntered) {
    transformX = 0.0;
    transformY = 0.0;
  }

  transformStyle = `transform: translate3d(${transformX}px, ${transformY}px, 0.000001px)`;
});

function onPointerMove(event: PointerEvent) {
  if(!pointerEntered || !root) return;

  const parentCenterX = root.getBoundingClientRect().width / 2;
  const parentLeftX = root.getBoundingClientRect().left;
  const parentCenterY = root.getBoundingClientRect().height / 2;
  const parentTopY = root.getBoundingClientRect().top;

  requestAnimationFrame(() => {
    const { clientX, clientY } = event;
    const deltaXRatio = (parentCenterX + parentLeftX) - clientX;
    const deltaYRatio = (parentCenterY + parentTopY) - clientY;

    transformX = -deltaXRatio * transformThreshold;
    transformY = -deltaYRatio * transformThreshold;
  });
}
</script>

<style lang="scss">
.domain-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(90vh / 3);

  .title {
    display: flex;
    font-size: 4em;

    transition: transform 0.2s ease-out;
  }
}

@media (max-width: 700px) {
  .domain-item {
    .title {
      font-size: 3em;
    }
  }
}
</style>
