<span class="title-segment
             { hover ? 'hover' : '' }"
      title={ seg.description }
      on:pointerenter={ () => hover = true }
      on:pointerleave={ () => hover = false }>
  { seg.text }

  {#if seg.description}
    <span class="description"
          style="color: { seg.forceColor ?? stc(seg.text) };">
      { seg.description }
    </span>
  {/if}
</span>

<script lang="ts">
import stc from "string-to-color";
import type { DomainItemTitleSegmentData } from "$lib/types";

export let seg: DomainItemTitleSegmentData;

$: hover = false;
</script>

<style lang="scss">
.title-segment {
  position: relative;

  .description {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    font-size: 0.25em;
    text-align: center;
    border-top: solid 0.25em currentColor;
    pointer-events: none;

    transform: translateY(-50%);
    opacity: 0;
    transition: opacity 0.5s cubic-bezier(0, 0, 0, 1),
                transform 0.5s cubic-bezier(0, 0, 0, 1);
  }

  &.hover {
    .description {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
