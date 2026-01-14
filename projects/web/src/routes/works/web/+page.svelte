<div class="page">
  <div class="nav-desc">
    <p>&nbsp;작성 예정</p>
    <p>&nbsp;스크립팅에 기본적으로 <b><IconText svg={ siTypescript.svg }>TypeScript</IconText></b>를 사용합니다. <b><IconText svg={ siVuedotjs.svg }>Vue</IconText></b> 및 <b><IconText svg={ siSvelte.svg }>Svelte</IconText></b>를 주력 프론트엔드 프레임워크로 사용합니다. 백엔드 프레임워크로 <b><IconText svg={ siNestjs.svg }>NestJS</IconText></b>를 활용한 경험이 있습니다.</p>
    <p>&nbsp;<b><IconText svg={ siCss.svg }>CSS</IconText></b>를 직접 작성하여 스타일링이 가능하며, <b><IconText svg={ siSass.svg }>SCSS</IconText></b> 사용을 선호합니다.</p>
  </div>

  <div class="my-8"></div>

  {#each projects as project}
    <div class="flex flex-row mb-8 gap-4">
      <img class="w-lg aspect-video rounded-xl object-cover bg-black"
           srcset={ generateImageSrcSet(project.headerImageRemoteSrcSet) }
           src={ transformRemoteAssetPath(project.headerImageRemoteSrcSet?.[0]?.path) ?? encodedBlackImage }
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
  {/each}
</div>

<script lang="ts">
import type { ProjectData } from "@somni.one/common";
import { siTypescript, siVuedotjs, siSvelte, siNestjs, siCss, siSass } from "simple-icons";
import IconText from "$/components/IconText.svelte";
import WebWorks from "@somni.one/common/data/works/projects/web.json";
import { generateImageSrcSet, transformRemoteAssetPath } from "$/lib/utils";
import { getTechStackData } from "$/lib/tech-stacks";
import SpanWithTip from "$/components/SpanWithTip.svelte";

const projects = WebWorks as ProjectData[];
const encodedBlackImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
</script>

<style lang="scss" scoped>
@reference "$/styles/app.css";

.nav-desc {
  @apply text-xl font-extralight text-background-inverse/50;
}
</style>
