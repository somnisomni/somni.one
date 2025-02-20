<section class="domain-item"
         bind:this="{ root }"
         on:pointerenter={ () => pointerEntered = true }
         on:pointerleave={ () => pointerEntered = false }
         on:pointermove={ onPointerMove }>
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

export let data: DomainItemData;

const transformThreshold = 0.1;
let root: HTMLElement | null = null;
let pointerEntered = false;
let transformX = 0.0;
let transformY = 0.0;
let transformStyle = "";
$: {
  if(!pointerEntered) {
    transformX = 0.0;
  }

  transformStyle = `transform: translate3d(${transformX}%, ${transformY}%, 0.000001px)`;
}

function onPointerMove(event: PointerEvent) {
  if(!pointerEntered || !root) return;

  const parentCenterX = root.getBoundingClientRect().width / 2;
  const parentCenterY = root.getBoundingClientRect().height / 2;

  requestAnimationFrame(() => {
    const { clientX, clientY } = event;
    const deltaXRatio = (parentCenterX - clientX) / parentCenterX;
    const deltaYRatio = (parentCenterY - clientY) / parentCenterY;

    transformX = deltaXRatio * transformThreshold * -100;
    transformY = deltaYRatio * transformThreshold * -100;
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
