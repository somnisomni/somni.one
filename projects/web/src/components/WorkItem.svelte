<div class="flex flex-row mb-8 gap-4">
  <img class="w-lg aspect-video rounded-xl object-cover bg-black"
        srcset={ generateImageSrcSet(project.headerImageRemoteSrcSet) }
        src={ transformRemoteAssetPath(project.headerImageRemoteSrcSet?.[0]?.path) ?? BLACK_IMAGE_ENCODED }
        alt={ project.title } />

  <div class="flex flex-col justify-center">
    <p class="text-3xl font-medium">{@html project.title}</p>
    <p class="text-sm font-extralight">{ project.yearFrom } {#if project.association}/ { project.association }{/if}</p>
    <p class="inline-flex items-center flex-wrap my-4">
      {#each project.stacks as stack}
        <span class="inline-flex items-center m-1 fill-current"
              style="color: #{ getTechStackData(stack).colorHex }">
          <SpanWithTip tip={ getTechStackData(stack).title }
                        notText={ true }>
            <span class="w-6">{@html getTechStackData(stack).svg}</span>
          </SpanWithTip>
        </span>
      {/each}
    </p>
    <p class="text-lg font-light">{@html project.desc}</p>
  </div>
</div>

<script lang="ts">
import type { ProjectData } from "@somni.one/common";
import SpanWithTip from "$/components/SpanWithTip.svelte";
import { getTechStackData } from "$/lib/tech-stacks";
import { BLACK_IMAGE_ENCODED, generateImageSrcSet, transformRemoteAssetPath } from "$/lib/utils";

const { project }: { project: ProjectData } = $props();
</script>
