{#each Object.values(categories) as category, index (category.id)}
  <a id={ category.id }
     class="work-category-card"
     href={ category.href }
     in:fly={{ y: 100, duration: 1000, delay: index * 200, easing: quartOut }}>
    {#if category.headerImageRemoteSrc}
      <img class="absolute right-0 top-0 w-[50%] h-full object-cover object-center"
           src={ category.headerImageRemoteSrc }
           alt={ $_(category.nameKey) } />
    {/if}

    <div class="z-10">
      <span class="title">{ $_(category.nameKey) }</span>
    </div>
  </a>
{/each}

<script lang="ts">
import { fly } from "svelte/transition";
import projectsGame from "@somni.one/common/data/works/projects/game.json";
import projectsWeb from "@somni.one/common/data/works/projects/web.json";
import { transformRemoteAssetPath } from "$/lib/utils";
import { getLatestFeaturedWork, type ProjectData } from "@somni.one/common";
import { onMount } from "svelte";
import { _ } from "svelte-i18n";
import { quartOut } from "svelte/easing";

let categories: Record<string, typeof categoryDefinitions[keyof typeof categoryDefinitions]> = $state({});
const categoryDefinitions = {
  games: {
    id: "games",
    nameKey: "works.category.games",
    href: "/works/games",
    headerImageRemoteSrc: transformRemoteAssetPath(getLatestFeaturedWork(projectsGame as ProjectData[], true)?.headerImageRemoteSrcSet?.[0]?.path),
  },
  web: {
    id: "web",
    nameKey: "works.category.web",
    href: "/works/web",
    headerImageRemoteSrc: transformRemoteAssetPath(getLatestFeaturedWork(projectsWeb as ProjectData[], true)?.headerImageRemoteSrcSet?.[0]?.path),
  },
  translations: {
    id: "translations",
    nameKey: "works.category.translations",
    href: "/works/translations",
    headerImageRemoteSrc: null,
  },
};

onMount(() => {
  categories = categoryDefinitions;
});
</script>

<style lang="scss">
@reference "$/styles/app.css";

.work-category-card {
  @apply relative flex w-full h-64 p-8 justify-start items-end;

  .title {
    @apply text-[2em] font-bold;
  }
}
</style>
