<div class="page">
  <div class="py-4"></div>

  <section>
    <div class="nav mb-8!">/// <span class="opacity-50">somni::</span>IN_A_NUTSHELL</div>

    <ScaleAnimationOnHover>
      <LinkAnchor linkId="github">
        <GitHubProfileImage elevate={ true } />
      </LinkAnchor>
    </ScaleAnimationOnHover>

    <div class="content in-a-nutshell">
      <p>&nbsp;<strong>{ $_("main.content.headline.seg1") }<SpanWithTip tip={ $_("main.content.headline.somni.tip") }>somni</SpanWithTip>{ $_("main.content.headline.seg2") }</strong></p>
      <p>&nbsp;도전과 노력을 최고의 가치로 여깁니다. <b>웹</b>을 포함한 <SpanWithTip tip="임베디드, 모바일 앱, 데스크탑 프로그램, SNS/메신저 봇, 생산 자동화(PLC) 등...">다양한 개발 분야</SpanWithTip>를 접해 보았으며, 이제는 <b>게임 개발</b>이라는 확고한 방향을 가지고 나아가고 있습니다.</p>
      <p>&nbsp;게임 내 오브젝트를 기능하게 만들 때마다 큰 즐거움과 희열을 느낍니다. 이 즐거움이 많은 플레이어들에게 전해질 수 있도록 끊임없이 공부하고 있습니다.</p>
      <p>&nbsp;현재 <a href="https://ck.ac.kr">청강문화산업대학교</a>에 재학 중이며, 실력파 팀원들과 함께 졸업 작품 게임 프로젝트 「<a href="https://ck25-palette.notion.site/Palette-KOR-22bd7b6d0d0c80a8917aebee9471b57d">컬러팅! 캐치 & 라비</a>」를 개발하고 있습니다.</p>
      <p class="opacity-70 text-lg!"><a href="/about">자세히 보기 ›</a></p>
    </div>
  </section>

  <section>
    <div class="nav">/// <span class="opacity-50">somni::</span>FEATURED_WORKS</div>

    <div class="content">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {#each featuredWorks as work}
          <FeaturedWorkItem data={ work } />
        {/each}
      </div>

      <p class="opacity-70"><a href="/works">모든 작업물 보기 ›</a></p>
    </div>
  </section>

  <section>
    <div class="nav">/// <span class="opacity-50">somni::</span>QUICK_LINKS</div>

    <div class="content mt-0!">
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

      <p class="opacity-70"><a href="/links">모든 링크 및 연락처 보기 ›</a></p>
    </div>
  </section>
</div>

<script lang="ts">
import type { ProjectData } from "@somni.one/common";
import { _ } from "svelte-i18n";
import { siGithub, siX } from "simple-icons";
import GitHubProfileImage from "$/components/GitHubProfileImage.svelte";
import LinkAnchor from "$/components/LinkAnchor.svelte";
import ScaleAnimationOnHover from "$/components/ScaleAnimationOnHover.svelte";
import SpanWithTip from "$/components/SpanWithTip.svelte";
import FaLinesLeaning from "$/assets/icons/fa-lines-leaning-solid-full.svg?raw";
import FaAt from "$/assets/icons/fa-at-solid-full.svg?raw";
import FeaturedWorkItem from "$/components/FeaturedWorkItem.svelte";
import projectsGames from "@somni.one/common/data/works/projects/game.json";
import projectsSoftwares from "@somni.one/common/data/works/projects/software.json";
import projectsWeb from "@somni.one/common/data/works/projects/web.json";

const featuredWorks = [
  ...projectsGames.filter(p => p.featured) as ProjectData[],
  ...projectsSoftwares.filter(p => p.featured) as ProjectData[],
  ...projectsWeb.filter(p => p.featured) as ProjectData[],
].sort((a, b) => {
  return b.yearFrom - a.yearFrom;
}).slice(0, 6);
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

  .content {
    @apply my-8 text-xl font-light text-background-inverse/50;

    &.in-a-nutshell {
      @apply text-4xl;
      @apply /* < md */ max-md:text-3xl;
    }

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
    @apply flex flex-row flex-wrap *:m-2;

    :global(img), :global(svg) {
      @apply fill-background-inverse w-12 h-12;
    }

    & > :global(*) {
      @apply mx-2 rounded-xl border border-background-inverse/20;
      @apply transition-shadow duration-200 ease-in-out;

      &:hover {
        @apply shadow-lg;
      }
    }
  }
}
</style>
