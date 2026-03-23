<div class="page">
  <div class="nav-desc">
    <p>&nbsp;작성 예정</p>
    <p>&nbsp;스크립팅에 기본적으로 <b><RenderIcon icon={ SiTypescript }>TypeScript</RenderIcon></b>를 사용합니다. <b><RenderIcon icon={ SiVuedotjs }>Vue</RenderIcon></b> 및 <b><RenderIcon icon={ SiSvelte }>Svelte</RenderIcon></b>를 주력 프론트엔드 프레임워크로 사용합니다. 백엔드 프레임워크로 <b><RenderIcon icon={ SiNestjs }>NestJS</RenderIcon></b>를 활용한 경험이 있습니다.</p>
    <p>&nbsp;<b><RenderIcon icon={ SiCss }>CSS</RenderIcon></b>를 직접 작성하여 스타일링이 가능하며, <b><RenderIcon icon={ SiSass }>SCSS</RenderIcon></b> 사용을 선호합니다.</p>
  </div>

  <div class="my-8"></div>

  {#each projects as project}
    <ProjectItem { project } />
  {/each}
</div>

<script lang="ts">
import type { ProjectData } from "@somni.one/common";
import WebWorks from "@somni.one/common/data/works/projects/web.json";
import ProjectItem from "$/components/works/ProjectItem.svelte";
import { SiCss, SiNestjs, SiSass, SiSvelte, SiTypescript, SiVuedotjs } from "@icons-pack/svelte-simple-icons";
import RenderIcon from "$/components/RenderIcon.svelte";

const projects = (WebWorks as ProjectData[]).sort((a, b) => b.yearFrom - a.yearFrom);
</script>

<style lang="scss" scoped>
.nav-desc {
  @apply text-xl font-extralight text-background-inverse/50;
}
</style>
