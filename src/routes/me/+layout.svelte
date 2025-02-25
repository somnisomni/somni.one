<nav id="navigation">
  <a href="/"
     class="inline-block"
     title={$_("common.nav.back")}>
    <img src={faArrowLeft}
         alt={$_("common.nav.back")}
         class="p-3 w-12 h-12" />
  </a>

  <span class="text-2xl font-bold">somni</span>
  <span class="text-2xl font-thin">{$_("me.nav.title")}</span>
</nav>

<nav id="me-tab-nav">
  <ul bind:this={tabListElement}
      id="me-tab-list">
    <li class:active={pageRouteId?.endsWith("individual")}><a href="/me/individual">{$_("me.nav.individualProjects")}</a></li>
    <li class:active={pageRouteId?.endsWith("team")}><a href="/me/team">{$_("me.nav.teamProjects")}</a></li>
    <li class:active={pageRouteId?.endsWith("opensource")}><a href="/me/opensource">{$_("me.nav.openSourceContributions")}</a></li>
    <li class:active={pageRouteId?.endsWith("translation")}><a href="/me/translation">{$_("me.nav.translationContributions")}</a></li>
    <li class:active={pageRouteId?.endsWith("certification")}><a href="/me/certification">{$_("me.nav.certifications")}</a></li>
  </ul>
</nav>

<div class="lg:max-w-3/4 mx-auto">
  {@render children()}
</div>

<script lang="ts">
import type { LayoutProps } from "./$types";
import { page } from "$app/state";
import { _ } from "svelte-i18n";
import faArrowLeft from "$/assets/icons/ui/fa-arrow-left.svg";

const { children }: LayoutProps = $props();

let tabListElement!: HTMLElement;
let pageRouteId = $derived(page.route.id);

$effect(() => {
  if(pageRouteId && tabListElement) {
    const activeTabElement: HTMLElement | null = tabListElement.querySelector("li.active");

    if(activeTabElement) {
      const activeTabLeft = activeTabElement.offsetLeft - 50;

      tabListElement.scroll({
        left: activeTabLeft,
        behavior: "smooth",
      });
    }
  }
});
</script>

<style>
@reference "$/styles/app.css";

#navigation {
  @apply relative flex flex-row items-center
         p-2 h-16 *:mr-2;
}

#me-tab-nav {
  @apply relative py-2 h-16 sm:h-24;
}

#me-tab-nav::after {
  @apply absolute block w-full left-0 top-0 right-0 bottom-0
         pointer-events-none;

  content: "";
  height: 100%;
  background-image: linear-gradient(to right,
                                    rgba(255, 255, 255, 1) 0%,
                                    rgba(255, 255, 255, 0) 5%,
                                    rgba(255, 255, 255, 0) 95%,
                                    rgba(255, 255, 255, 1) 100%);
}

#me-tab-list {
  @apply flex flex-row justify-start items-center
         relative h-full text-2xl sm:text-4xl;

  overflow-x: overlay;
  overflow-y: hidden;
}

#me-tab-list::-webkit-scrollbar {
  @apply hidden;
}

#me-tab-list > li {
  @apply relative shrink-0 font-thin mx-2 sm:mx-4 px-2 opacity-50;

  transition-property: font-weight, opacity;
  transition-duration: var(--duration-long);
  transition-timing-function: var(--ease-out-extreme);
}

#me-tab-list > li::before {
  @apply absolute block left-0 right-0 -bottom-1 sm:-bottom-2
         h-1 rounded-full bg-sky-300;

  content: "";
  transform: scaleX(0);
  transition: transform var(--duration-long) var(--ease-out-extreme);
}

#me-tab-list > li:first-child { @apply ml-8; }
#me-tab-list > li:last-child { @apply mr-8; }

#me-tab-list > li.active {
  @apply font-medium opacity-100;
}

#me-tab-list > li.active::before {
  transform: scaleX(1);
}
</style>
