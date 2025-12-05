<button type="button"
        class="color-mode-indicator"
        onclick={ toggleColorMode }>
  {#if currentColorMode === "auto"}
    <span in:fly={ flyInParams } out:fly={ flyOutParams }>{@html faCircleHalfStroke}</span>
  {:else if currentColorMode === "light"}
    <span in:fly={ flyInParams } out:fly={ flyOutParams }>{@html faSun}</span>
  {:else if currentColorMode === "dark"}
    <span in:fly={ flyInParams } out:fly={ flyOutParams }>{@html faMoon}</span>
  {/if}
</button>

<script lang="ts">
import faSun from "$assets/icons/fa-sun-solid-full.svg?raw";
import faMoon from "$assets/icons/fa-moon-solid-full.svg?raw";
import faCircleHalfStroke from "$assets/icons/fa-circle-half-stroke-solid-full.svg?raw";
import { fly, type FlyParams } from "svelte/transition";
import { quartOut } from "svelte/easing";

const animationDuration = 500;
const flyInParams: FlyParams = {
  duration: animationDuration,
  easing: quartOut,
  x: 20,
};
const flyOutParams: FlyParams = {
  duration: animationDuration,
  easing: quartOut,
  x: -20,
};

let currentColorMode: "auto" | "light" | "dark" = $state("auto");
let toggleable = $state(true);

function toggleColorMode() {
  if(!toggleable) return;

  if(currentColorMode === "auto") {
    currentColorMode = "light";
  } else if(currentColorMode === "light") {
    currentColorMode = "dark";
  } else {
    currentColorMode = "auto";
  }

  toggleable = false;
  setTimeout(() => { toggleable = true; }, animationDuration);
}

$effect(() => {
  document.documentElement.classList.remove("force-light", "force-dark");

  if(currentColorMode === "light") {
    document.documentElement.classList.add("force-light");
  } else if(currentColorMode === "dark") {
    document.documentElement.classList.add("force-dark");
  }
})
</script>

<style lang="scss" scoped>
@reference "$/styles/app.css";

.color-mode-indicator {
  @apply flex items-center justify-center opacity-80;
  @apply transition-[background-color,opacity] duration-200;

  &:hover {
    @apply cursor-pointer opacity-100 bg-background/80;

    span {
      @apply fill-primary;
    }
  }

  span {
    @apply absolute w-[3em] h-[3em] fill-background;
    @apply transition-[fill] duration-[inherit];
    @apply /* < md */ max-md:w-[2em] max-md:h-[2em];
  }
}
</style>
