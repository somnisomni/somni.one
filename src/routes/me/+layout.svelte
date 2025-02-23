<nav id="me-tab-nav">
  <ul id="me-tab-list">
    <li class:active={page.route.id?.endsWith("individual")}><a href="/me/individual">{$_("me.nav.individualProjects")}</a></li>
    <li class:active={page.route.id?.endsWith("team")}><a href="/me/team">{$_("me.nav.teamProjects")}</a></li>
    <li class:active={page.route.id?.endsWith("opensource")}><a href="/me/opensource">{$_("me.nav.openSourceContributions")}</a></li>
    <li class:active={page.route.id?.endsWith("translation")}><a href="/me/translation">{$_("me.nav.translationContributions")}</a></li>
  </ul>
</nav>

<div>
  {@render children()}
</div>

<script lang="ts">
import { page } from "$app/state";
import { _ } from "svelte-i18n";
import type { LayoutProps } from "./$types";

const { children }: LayoutProps = $props();
</script>

<style>
@reference "$/app.css";

#me-tab-nav {
  @apply relative py-4;

  --tab-nav-height: 6rem;
  height: var(--tab-nav-height);
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
         relative h-full text-4xl;

  overflow-x: overlay;
  overflow-y: hidden;
}

#me-tab-list::-webkit-scrollbar {
  @apply hidden;
}

#me-tab-list > li {
  @apply font-thin mx-4 sm:mx-6 shrink-0 opacity-50;
}

#me-tab-list > li:first-child { @apply ml-8; }
#me-tab-list > li:last-child { @apply mr-8; }

#me-tab-list > li.active {
  @apply font-medium opacity-100;
}
</style>
