<div class="nav-desc">
  <p>&nbsp;이전에는 단순히 게임을 플레이하는 것을 좋아했지만, 매우 다양한 창작 분야가 모여 하나의 작품을 이루는 <i>"창작의 정수"</i>라는 점을 알게 되었고 이에 매료되어 게임 개발자의 길을 걷게 되었습니다.</p>
  <p>&nbsp;현재 <b><IconText svg={ siUnity.svg }>Unity</IconText></b>를 주력으로 다루고 있고, <b><IconText svg={ siUnrealengine.svg }>Unreal Engine</IconText></b>을 기본적인 수준으로 다룰 수 있습니다.</p>
  <p>&nbsp;게임의 <b>적응형 사운드</b>에 관심이 많으며 주력 사운드 미들웨어는 <IconText svg={ siFmod.svg }><b>FMOD</b></IconText>입니다. 이를 이용해 사운드 이벤트를 구성하고 인게임에 적용한 경험이 있습니다.</p>
</div>

<div>
  <p>* test</p>
  <img src={ testImageSrc } />
</div>

<script lang="ts">
import { siUnity, siUnrealengine, siFmod } from "simple-icons";
import IconText from "$/components/IconText.svelte";
import projectsTeam from "@somni.one/common/data/works/projects_team.json";
import type { ProjectTeamData } from "@somni.one/common";

const remoteImageHost = import.meta.env.VITE_REMOTE_ASSETS_HOST_URL;
const testImageSrc = $derived(remoteImageHost + (projectsTeam as ProjectTeamData[]).find(p => p.id === "ck-graduation-colorting")?.headerImageRemotePaths?.[0]);
</script>

<style lang="scss" scoped>
@reference "$/styles/app.css";

.nav-desc {
  @apply text-xl font-extralight text-background-inverse/50;
}
</style>
