<div class="flex flex-row mb-8 gap-4">
  <img class="w-lg h-fit shrink-0 aspect-video rounded-xl object-cover bg-black"
        srcset={ generateImageSrcSet(project.headerImageRemoteSrcSet) }
        src={ transformRemoteAssetPath(project.headerImageRemoteSrcSet?.[0]?.path) ?? BLACK_IMAGE_ENCODED }
        alt={ project.title } />

  <div class="flex flex-col justify-center">
    <p class="text-3xl font-bold">{@html project.title}</p>
    <p class="text-sm font-light opacity-70">{ project.yearFrom } {#if project.association}/ { project.association }{/if}</p>
    <p class="inline-flex items-center flex-wrap my-4">
      {#each project.stacks as stack}
        <span class="icon inline-flex items-center m-1 fill-current"
              style="--color-on-light: #{ getTechStackData(stack).colorHex }; --color-on-dark: #{ getTechStackData(stack).colorHexOnDark ?? getTechStackData(stack).colorHex };">
          <SpanWithTip tip={ getTechStackData(stack).title }
                       notText={ true }>
            <span class="w-6">{@html getTechStackData(stack).svg}</span>
          </SpanWithTip>
        </span>
      {/each}
    </p>
    <p class="desc text-md font-light">{@html project.desc}</p>
  </div>
</div>

<script lang="ts">
import type { ProjectData } from "@somni.one/common";
import SpanWithTip from "$/components/SpanWithTip.svelte";
import { getTechStackData } from "$/lib/tech-stacks";
import { BLACK_IMAGE_ENCODED, generateImageSrcSet, transformRemoteAssetPath } from "$/lib/utils";

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
