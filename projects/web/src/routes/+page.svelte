<div class="page">
  <div class="py-4"></div>

  <section>
    <div class="nav !mb-8">/// Me in a nutshell</div>

    <ScaleAnimationOnHover>
      <LinkAnchor linkId="github">
        <GitHubProfileImage elevate={ true } />
      </LinkAnchor>
    </ScaleAnimationOnHover>

    <div class="content">
      <p>&nbsp;<strong>{ $_("main.content.headline.seg1") }<SpanWithTip tip={ $_("main.content.headline.somni.tip") }>somni</SpanWithTip>{ $_("main.content.headline.seg2") }</strong></p>
      <p>&nbsp;도전과 노력을 최고의 가치로 여깁니다. <b>웹</b>을 포함한 다양한 개발 분야를 접해 보았으며, 이제는 <b>게임 개발</b>이라는 확고한 방향을 가지고 나아가고 있습니다.</p>
      <p>&nbsp;게임 내 오브젝트를 기능하게 만들 때마다 큰 즐거움과 희열을 느낍니다. 이 즐거움이 많은 플레이어들에게 전해질 수 있도록 끊임없이 공부하고 있습니다.</p>
      <p>&nbsp;현재 <a href="https://ck.ac.kr">청강문화산업대학교</a>에 재학 중이며, 실력파 팀원들과 함께 졸업 작품 게임 프로젝트 「<a href="https://ck25-palette.notion.site/Palette-KOR-22bd7b6d0d0c80a8917aebee9471b57d">컬러팅! 캐치 & 라비</a>」를 개발하고 있습니다.</p>
      <p class="opacity-70 !text-[0.5em]"><a href="/me">자세히 보기 ›</a></p>
    </div>
  </section>

  <section>
    <div class="nav">/// Quick links</div>

    <div class="content">
      <div class="quick-links">
        <LinkAnchor linkId="blog">
          <SpanWithTip tip={ $_("links.blog.anchorTip") }
                       notText={ true }>
            <ScaleAnimationOnHover>
              <div class="p-4">{@html FaLinesLeaning}</div>
            </ScaleAnimationOnHover>
          </SpanWithTip>
        </LinkAnchor>
        <LinkAnchor linkId="email">
          <SpanWithTip tip={ $_("links.email.anchorTip") }
                       notText={ true }>
            <ScaleAnimationOnHover>
              <div class="p-4">{@html FaAt}</div>
            </ScaleAnimationOnHover>
          </SpanWithTip>
        </LinkAnchor>
        <LinkAnchor linkId="github">
          <SpanWithTip tip={ $_("links.github.anchorTip") }
                       notText={ true }>
            <ScaleAnimationOnHover>
              <div class="p-4">{@html siGithub.svg}</div>
            </ScaleAnimationOnHover>
          </SpanWithTip>
        </LinkAnchor>
        <LinkAnchor linkId="twitter">
          <SpanWithTip tip={ $_("links.twitter.anchorTip") }
                       notText={ true }>
            <ScaleAnimationOnHover>
              <div class="p-4">{@html siX.svg}</div>
            </ScaleAnimationOnHover>
          </SpanWithTip>
        </LinkAnchor>
      </div>

      <p class="opacity-70 !text-[0.5em]"><a href="/links">모든 링크 및 연락처 보기 ›</a></p>
    </div>
  </section>

  <section>
    <div class="nav">/// Game dev</div>
    <div class="nav-desc">
      <p>&nbsp;이전에는 단순히 게임을 플레이하는 것을 좋아했지만, 매우 다양한 창작 분야가 모여 하나의 작품을 이루는 <i>"창작의 정수"</i>라는 점을 알게 되었고 이에 매료되어 게임 개발자의 길을 걷게 되었습니다.</p>
      <p>&nbsp;현재 <b><IconText svg={ siUnity.svg }>Unity</IconText></b>를 주력으로 다루고 있고, <b><IconText svg={ siUnrealengine.svg }>Unreal Engine</IconText></b>을 기본적인 수준으로 다룰 수 있습니다.</p>
      <p>&nbsp;게임의 <b>적응형 사운드</b>에 관심이 많으며 주력 사운드 미들웨어는 <IconText svg={ siFmod.svg }><b>FMOD</b></IconText>입니다. 이를 이용해 사운드 이벤트를 구성하고 인게임에 적용한 경험이 있습니다.</p>
    </div>

    <div class="content">
      <p>(작성 예정) <!-- featured works here --></p>
    </div>
  </section>

  <section>
    <div class="nav">/// Web dev</div>
    <div class="nav-desc">
      <p>&nbsp;작성 예정</p>
      <p>&nbsp;스크립팅에 기본적으로 <b><IconText svg={ siTypescript.svg }>TypeScript</IconText></b>를 사용합니다. <b><IconText svg={ siVuedotjs.svg }>Vue</IconText></b> 및 <b><IconText svg={ siSvelte.svg }>Svelte</IconText></b>를 주력 프론트엔드 프레임워크로 사용합니다. 백엔드 프레임워크로 <b><IconText svg={ siNestjs.svg }>NestJS</IconText></b>를 활용한 경험이 있습니다.</p>
      <p>&nbsp;<b><IconText svg={ siCss.svg }>CSS</IconText></b>를 직접 작성하여 스타일링이 가능하며, <b><IconText svg={ siSass.svg }>SCSS</IconText></b> 사용을 선호합니다.</p>
    </div>

    <div class="content">
      <p>(작성 예정) <!-- featured works here --></p>
    </div>
  </section>
</div>

<script lang="ts">
import { _ } from "svelte-i18n";
import { siTypescript, siGithub, siX, siVuedotjs, siSvelte, siNestjs, siHtml5, siCss, siSass, siCloudflare, siPodman } from "simple-icons";
import GitHubProfileImage from "$/components/GitHubProfileImage.svelte";
import LinkAnchor from "$/components/LinkAnchor.svelte";
import ScaleAnimationOnHover from "$/components/ScaleAnimationOnHover.svelte";
import SpanWithTip from "$/components/SpanWithTip.svelte";
import FaLinesLeaning from "$/assets/icons/fa-lines-leaning-solid-full.svg?raw";
import FaAt from "$/assets/icons/fa-at-solid-full.svg?raw";
import { siUnity, siUnrealengine, siFmod } from "simple-icons";
import IconText from "$/components/IconText.svelte";
</script>

<style lang="scss">
@reference "$/styles/app.css";

p {
  b {
    @apply font-semibold;
  }

  a {
    @apply border-b-2 border-solid border-current;
  }
}

.page {
  section {
    @apply mb-16;
  }

  .nav {
    @apply text-accent font-mono uppercase mb-4;
  }

  .nav-desc {
    @apply text-xl font-extralight text-background-inverse/50;
  }

  .content {
    @apply my-8 text-4xl font-light text-background-inverse/50;

    strong {
      @apply font-extrabold text-background-inverse;
    }

    p {
      @apply my-4;

      &:not(:first-child) {
        @apply text-[0.75em];
      }
    }
  }

  .quick-links {
    @apply flex flex-row *:mx-2;

    :global(img), :global(svg) {
      @apply fill-background-inverse w-12 h-12;
    }

    & > :global(*) {
      @apply mx-2 rounded-xl border-1 border-background-inverse/20;
      @apply transition-shadow duration-200 ease-in-out;

      &:hover {
        @apply shadow-lg;
      }

      &:first-child { @apply ml-0; }
      &:last-child  { @apply mr-0; }
    }
  }
}
</style>
