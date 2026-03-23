<div class="page">
  <div class="nav-desc">
    <p>&nbsp;이전에는 단순히 게임을 플레이하는 것을 좋아했지만, 매우 다양한 창작 분야가 모여 하나의 작품을 이루는 <i>"창작의 정수"</i>라는 점을 알게 되었고 이에 매료되어 게임 개발자의 길을 걷게 되었습니다.</p>
    <p>&nbsp;현재 <b><RenderIcon icon={ SiUnity }>Unity</RenderIcon></b>를 주력으로 다루고 있습니다.</p>
    <p>&nbsp;게임의 <b>적응형 사운드</b>에 관심이 많으며 주력 사운드 미들웨어는 <RenderIcon icon={ SiFmod }><b>FMOD</b></RenderIcon>입니다. 이를 이용해 사운드 이벤트를 구성하고 인게임에 적용한 경험이 있습니다.</p>
  </div>

  <div class="my-8"></div>

  {#each projects as project}
    <ProjectItem { project } />
  {/each}
</div>

<script lang="ts">
import type { ProjectData } from "@somni.one/common";
import GameWorks from "@somni.one/common/data/works/projects/game.json";
import ProjectItem from "$/components/works/ProjectItem.svelte";
import RenderIcon from "$/components/RenderIcon.svelte";
import { SiFmod, SiUnity } from "@icons-pack/svelte-simple-icons";

const projects = (GameWorks as ProjectData[]).sort((a, b) => b.yearFrom - a.yearFrom);
</script>

<style lang="scss" scoped>
.nav-desc {
  @apply text-xl font-extralight text-background-inverse/50;
}
</style>
