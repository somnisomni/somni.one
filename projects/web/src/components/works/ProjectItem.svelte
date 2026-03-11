<div class="flex flex-col lg:flex-row mb-16 lg:mb-12 gap-4">
  <img class="w-full lg:w-md xl:w-lg
              h-64 lg:h-fit lg:aspect-video
              shrink-0 rounded-xl object-cover bg-black"
        srcset={ generateImageSrcSet(project.headerImageRemoteSrcSet) }
        src={ transformRemoteAssetPath(project.headerImageRemoteSrcSet?.[0]?.path) ?? BLACK_IMAGE_ENCODED }
        alt={ project.title } />

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
  </div>
</div>

<script lang="ts">
import { _ } from "svelte-i18n";
import { type ProjectData } from "@somni.one/common";
import SpanWithTip from "$/components/SpanWithTip.svelte";
import { getTechStackData } from "$/lib/tech-stacks";
import { BLACK_IMAGE_ENCODED, generateImageSrcSet, transformRemoteAssetPath } from "$/lib/utils";
import ProjectWorkTagList from "$/components/works/tags/ProjectWorkTagList.svelte";

const { project }: { project: ProjectData } = $props();
</script>

<style lang="scss" scoped>
.icon {
  @include by-color-scheme(color, var(--color-on-light), var(--color-on-dark));
}

.desc :global(a) {
  @apply underline;
}
</style>
