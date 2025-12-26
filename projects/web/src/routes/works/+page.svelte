<div>
  {#each Object.values(categories) as category, index (category.id)}
    <a id={ category.id }
       class="work-category-card"
       href={ category.href }
       in:fly={{ y: 100, duration: 1000, delay: index * 200, easing: quartOut }}>
      <div class="content">
        {#if category.headerImageSrc}
          <img class="featured-work-image"
               src={ category.headerImageSrc }
               alt={ $_(category.nameKey) } />
        {/if}

        <span class="title">{ $_(category.nameKey) }</span>
      </div>
    </a>
  {/each}

<div class="mt-50 mb-4 text-center opacity-20">Made with ♥</div>
</div>

<script lang="ts">
import { fly } from "svelte/transition";
import projectsGame from "@somni.one/common/data/works/projects/game.json";
import projectsWeb from "@somni.one/common/data/works/projects/web.json";
import { transformRemoteAssetPath } from "$/lib/utils";
import { getLatestFeaturedWork, type ProjectData } from "@somni.one/common";
import { onMount } from "svelte";
import { _ } from "svelte-i18n";
import { quartOut } from "svelte/easing";

const openSourceContributionBgImagePath = "/images/works/contribution-20251205-bg.webp";

let categories: Record<string, typeof categoryDefinitions[keyof typeof categoryDefinitions]> = $state({});
const categoryDefinitions = {
  games: {
    id: "games",
    nameKey: "works.category.games",
    href: "/works/games",
    headerImageSrc: transformRemoteAssetPath(getLatestFeaturedWork(projectsGame as ProjectData[], true)?.headerImageRemoteSrcSet?.[0]?.path),
  },
  web: {
    id: "web",
    nameKey: "works.category.web",
    href: "/works/web",
    headerImageSrc: transformRemoteAssetPath(getLatestFeaturedWork(projectsWeb as ProjectData[], true)?.headerImageRemoteSrcSet?.[0]?.path),
  },
  software: {
    id: "software",
    nameKey: "works.category.softwares",
    href: "/works/softwares",
    headerImageSrc: null,
  },
  contributions: {
    id: "contributions",
    nameKey: "works.category.contributions",
    href: "/works/contributions",
    headerImageSrc: transformRemoteAssetPath(openSourceContributionBgImagePath),
  },
};

onMount(() => {
  categories = categoryDefinitions;
});
</script>

<style lang="scss">
@reference "$/styles/app.css";

.work-category-card {
  @apply relative block w-full h-64 bg-background overflow-hidden;
  @apply scale-100 shadow-black/50 rounded-none border-transparent transition-[scale,box-shadow,border-radius,border-color] duration-500 ease-out;
  @apply /* < md */ max-md:h-48;

  &:hover {
    @apply z-10;
    @apply scale-102 shadow-2xl rounded-2xl border border-background-inverse;
    @apply /* < md */ max-md:scale-105;

    &:active {
      @apply scale-101;
      @apply /* < md */ max-md:scale-103;
    }

    .content {
      @apply opacity-100;
    }
  }

  .content {
    @apply relative flex w-full h-full px-6 py-4 justify-start items-end;
    @apply opacity-70 transition-opacity duration-[inherit] ease-[inherit];
  }

  .featured-work-image {
    @apply absolute right-0 top-0 w-[80%] h-full object-cover object-center;
    @apply /* < md */ max-md:w-[60%];

    clip-path: polygon(0 0, 100% 0%, 100% 100%, 25% 100%);
  }

  .title {
    @apply text-4xl font-bold;
    @apply /* < md */ max-md:text-2xl;

    &:after {
      @apply content-["›"] ml-2;
    }
  }
}
</style>
