<div class="page">

  {#each projects as project}
    <div class="flex flex-row mb-8 gap-4">
      <img class="w-lg aspect-video rounded-xl object-cover bg-black"
           srcset={ generateImageSrcSet(project.headerImageRemoteSrcSet) }
           src={ transformRemoteAssetPath(project.headerImageRemoteSrcSet?.[0]?.path) ?? encodedBlackImage }
           alt={ project.title } />

      <div class="flex flex-col justify-center">
        <p class="text-3xl font-medium">{@html project.title}</p>
        <p class="text-sm font-extralight">{project.yearFrom} {#if project.association}- { project.association }{/if}</p>
        <p class="text-lg font-light">{@html project.desc}</p>
      </div>
    </div>
  {/each}
</div>

<script lang="ts">
import { generateImageSrcSet, transformRemoteAssetPath } from "$/lib/utils";
import type { ProjectData } from "@somni.one/common";
import SoftwareWorks from "@somni.one/common/data/works/projects/software.json";

const projects = SoftwareWorks as ProjectData[];
const encodedBlackImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
</script>
