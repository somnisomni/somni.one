<div class="page">
  <div class="py-4"></div>

  <div class="text-accent font-mono uppercase mb-8">/// Me in a nutshell</div>

  <ScaleAnimationOnHover>
    <LinkAnchor linkId="github">
      <GitHubProfileImage elevate={ true } />
    </LinkAnchor>
  </ScaleAnimationOnHover>

  <div class="content">
    <p>&nbsp;<strong>{ $_("main.content.headline.seg1") }<SpanWithTip tip={ $_("main.content.headline.somni.tip") }>somni</SpanWithTip>{ $_("main.content.headline.seg2") }</strong></p>
    <p>&nbsp;도전과 노력을 최고의 가치로 여깁니다. <b>웹</b>을 포함한 다양한 개발 분야를 접해 보았으며, 이제는 <b>게임 개발</b>이라는 확고한 방향을 가지고 나아가고 있습니다.</p>
    <p>&nbsp;게임 내 오브젝트를 기능하게 만들 때마다 큰 즐거움과 희열을 느낍니다. 이 즐거움이 많은 플레이어들에게 전해질 수 있도록 끊임없이 공부하고 있습니다.</p>
    <p>&nbsp;현재 <a href="https://ck.ac.kr">청강문화산업대학교</a>에서 실력파 팀원들과 함께 졸업 작품 프로젝트 「<a href="https://ck25-palette.notion.site/Palette-KOR-22bd7b6d0d0c80a8917aebee9471b57d">컬러팅! 캐치 & 라비</a>」를 개발하고 있습니다.</p>
  </div>
</div>

<script lang="ts">
import { _ } from "svelte-i18n";
import GitHubProfileImage from "$/components/GitHubProfileImage.svelte";
import LinkAnchor from "$/components/LinkAnchor.svelte";
import ScaleAnimationOnHover from "$/components/ScaleAnimationOnHover.svelte";
import SpanWithTip from "$/components/SpanWithTip.svelte";
</script>

<style lang="scss">
@reference "$/styles/app.css";

.page {
  .content {
    @apply my-8 text-4xl font-light text-background-inverse/50;

    strong {
      @apply font-extrabold text-background-inverse;
    }

    b {
      @apply font-semibold;
    }

    a {
      @apply border-b-2 border-solid border-current;
    }

    p {
      @apply my-4;

      &:not(:first-child) {
        @apply text-[0.75em];
      }
    }
  }
}
</style>
