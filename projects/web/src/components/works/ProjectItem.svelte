<div class="flex flex-col lg:flex-row mb-16 lg:mb-12 gap-4">
  <img class="w-full lg:w-md xl:w-lg
              h-64 lg:h-fit lg:aspect-video
              shrink-0 rounded-xl object-cover bg-black"
        srcset={ generateImageSrcSet(project.headerImageRemoteSrcSet) }
        src={ transformRemoteAssetPath(project.headerImageRemoteSrcSet?.[0]?.path) ?? BLACK_IMAGE_ENCODED }
        alt={ project.title }
        loading="lazy" />

  <div class="flex flex-col justify-center">
    <p class="text-3xl font-bold">{@html project.title}</p>
    <p class="text-sm font-light opacity-70">
      <ProjectWorkTagList { project } />

      <span>{ project.yearFrom }</span>
      <span>{#if project.association}/ { project.association }{/if}</span>
    </p>

    <p class="inline-flex items-center flex-wrap my-4">
      {#each project.stacks as stack}
        {@const techStackData = getTechStackData(stack)}

        <span class="icon inline-flex items-center m-1 fill-current"
              style="--color-on-light: #{ techStackData.colorHex };
                     --color-on-dark: #{ techStackData.colorHexOnDark ?? techStackData.colorHex };">
          <SpanWithTip tip={ techStackData.title }
                       notText={ true }>
            <span class="w-6">{@html techStackData.svg}</span>
          </SpanWithTip>
        </span>
      {/each}
    </p>

    <p class="desc text-md font-light">{@html project.desc}</p>

    {#if hasAnyLink}
      <p class="links flex flex-row gap-2 text-md font-light mt-4">
        {#if project.appUrl} <a href={ project.appUrl } target="_blank" class="text-accent">{ $_("works.components.appUrl") } <SquareArrowOutUpRightIcon size="16" /></a> {/if}
        {#if project.pageUrl} <a href={ project.pageUrl } target="_blank">{ $_("works.components.relatedPageUrl") } <SquareArrowOutUpRightIcon size="16" /></a> {/if}
        {#if project.repositoryUrl} <a href={ project.repositoryUrl } target="_blank">{ $_("works.components.repositoryUrl") } <SquareArrowOutUpRightIcon size="16" /></a> {/if}
      </p>
    {/if}
  </div>
</div>

<script lang="ts">
import { _ } from "svelte-i18n";
import { type ProjectData } from "@somni.one/common";
import SpanWithTip from "$/components/SpanWithTip.svelte";
import { getTechStackData } from "$/lib/tech-stacks";
import { BLACK_IMAGE_ENCODED, generateImageSrcSet, transformRemoteAssetPath } from "$/lib/utils";
import ProjectWorkTagList from "$/components/works/tags/ProjectWorkTagList.svelte";
import { SquareArrowOutUpRightIcon } from "@lucide/svelte";

const { project }: { project: ProjectData } = $props();
const hasAnyLink = $derived(!!(project.appUrl || project.pageUrl || project.repositoryUrl));
</script>

<style lang="scss" scoped>
.icon {
  @include by-color-scheme(color, var(--color-on-light), var(--color-on-dark));
}

.desc :global(a) {
  @apply underline;
}

.links :global(svg) {
  @apply inline-block;
}

.links a {
  @apply opacity-40 border-b transition-[opacity,padding] duration-200 ease-out;
  @apply hover:opacity-100 hover:px-2;
}

.links a.text-accent {
  @apply opacity-60 hover:opacity-100;
}
</style>
