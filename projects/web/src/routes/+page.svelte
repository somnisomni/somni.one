<svelte:window bind:scrollY={ windowScrollY }
               onkeydown={ onKeyDown } />

<MainTransitionOverlay bind:this={ mainTransitionOverlay } />

<nav id="language-switcher"
     class="fixed font-mono top-0 right-0 z-10 p-4">
  <ul class="flex flex-ro gap-4">
    {#each $locales as loc}
      <li class:current={ loc == $locale }>
        <a href={ `#lang-${loc}` }
           onclick={ event => { event.preventDefault(); changeLanguage(loc); } }>{ loc }</a>
      </li>
    {/each}
  </ul>
</nav>

{#if window && windowScrollY <= 100}
  <div in:fade out:fade
       class="fixed right-0 bottom-0 mx-4 my-2 flex flex-col items-center">
    <div class="font-light text-[1em] capitalize tracking-[0.2em]">SCROLL</div>
    <div bind:this={ scrollDownElement }
         class="font-extralight fill-current w-[1.5em] h-[1.5em] m-[0.5em] mt-[0.25em]">{@html faChevronDown}</div>
  </div>
{/if}

<div id="smooth-wrapper">
  <div id="smooth-content">
    <section id="headline">
      <div class="min-w-full">
        <h1 class="headline-text">
          <p class="font-mono font-light text-nowrap">
            <span class="text-teal-500">web-dev</span>
            <span class="text-pink-500">game-dev</span>
            <span class="text-sky-600">translation</span>
          </p>
          <p bind:this={ headlineElement[0] }>{ $_("main.headline.line1") }</p>
          <p bind:this={ headlineElement[1] }>{ $_("main.headline.line2") }</p>
          <p bind:this={ headlineElement[2] }>{@html $_("main.headline.line3", { values: { emphasize: textToColorHtml($_("main.headline.emphasize")) }})}</p>
          <p class="font-mono font-light text-orange-300 text-[0.25em] text-nowrap my-2">
            <span>{ $_("main.wip") }</span>
          </p>
          <p class="user-typings overflow-clip">
            <span>
              <span>somni &gt;&nbsp;</span><!--
              --><a bind:this={ additionalTypingsUrlAnchor }
                class="user-typings-url"
                href={ additionalTypingsUrl }>
                <!-- Will be filled by typing -->
              </a>
            </span><!--

        --><span class="cursor ml-0.5">▏</span>
            {#if additionalTypingsUrl}
              <span in:fade out:fade
                    class="user-typings-url-hint">Ctrl + ⏎</span>
            {/if}
          </p>
        </h1>
      </div>
    </section>

    <section id="web-dev">
      <h3 class="text-teal-500">web-dev</h3>
      <h2></h2>

      <p class="jujeori">플랫폼 독립적이라는 점에서 매력을 느끼고 제 주력 분야로 정했습니다.</p>
      <p class="jujeori"><br /></p>
      <p class="jujeori">프론트엔드와 백엔드 모두 골고루 해보고 있습니다. <IconText svg={ siTypescript.svg }><b>TypeScript</b></IconText>를 기본적으로 사용하며, 주력 프론트엔드 프레임워크는 <IconText svg={ siVuedotjs.svg }><b>Vue</b></IconText> 및 <IconText svg={ siSvelte.svg }><b>Svelte</b></IconText> 입니다. 백엔드 프레임워크로 <IconText svg={ siNestjs.svg }><b>NestJS</b></IconText>를 사용해 본 경험이 있습니다. <IconText svg={ siCss.svg }><b>CSS</b></IconText>를 직접 작성할 수 있으며, <IconText svg={ siSass.svg }><b>SCSS</b></IconText>를 선호합니다.</p>
    </section>

    <section id="game-dev">
      <h3 class="text-pink-500">game-dev</h3>
      <h2>{ $_("main.section.game-dev.title") }</h2>

      <p class="jujeori">게임을 열심히 즐기기만 했지 만들 생각은 하지 못했던 저에게, 청강문화산업대학교 게임콘텐츠스쿨으로의 진학은 또 하나의 갈림길을 알려주었습니다.</p>
      <p class="jujeori">대학교에서 '1인분의 게임 프로그래머'가 되고자 하는 마음으로 학교 생활에 임해오고 있습니다. 어쩌면 그리 큰 목표처럼 보이진 않을 수 있지만, 시작이 늦은 저에게 있어 그 작은 목표가 의미하는 바는 매우 큽니다.</p>
      <p class="jujeori">현재 실력파 팀원들과 함께 "내 손으로 오브젝트를 살아 움직이게 만든다"는 성취감 속에서 졸업 프로젝트를 진행하고 있습니다.</p>
      <p class="jujeori"><br /></p>
      <p class="jujeori">저는 <IconText svg={ siUnity.svg }><b>Unity</b></IconText>를 주력으로 다루고 있습니다. 게임에 적용되는 <b>적응형 사운드</b>에도 관심이 많으며, 사운드 미들웨어로는 <IconText svg={ siFmod.svg }><b>FMOD</b></IconText>를 주력으로 사용합니다.</p>
    </section>

    <section id="translation">
      <h3 class="text-sky-600">translation</h3>
      <h2>{ $_("main.section.translation.title") }</h2>

      <p class="jujeori">저는 프로그래밍을 빨리 접했던 만큼 인터넷 검색을 영어로 하고 영어로 쓰인 글을 읽는 등 영어에 빨리 익숙해졌습니다.</p>
      <p class="jujeori">언젠가 자주 쓰는 프로그램에서 번역 기여로 개발자와 사용자를 도울 수 있다는 안내를 보았고, 남을 도울 수 있다는 생각에 부족한 영어 실력일지라도 번역 기여를 시작했고, 지금까지도 간간이 기여를 하고 있습니다.</p>
      <p class="jujeori"><br /></p>
      <p class="jujeori">주로 <b>영어 → 한국어</b> 번역 기여를 해오고 있습니다. 간단한 단어나 문장은 <b>영어, 한국어 → 일본어</b> 번역도 합니다. <b>일본어 → 한국어</b> 번역 기여 사례는 없었지만, 해볼 기회를 기다리고 있습니다.</p>
      <p class="jujeori">직접 사용하는 프로그램이나 서비스를 대상으로 번역 기여를 합니다. 그러한 대상의 특성 상, 사용자의 관점에서 이해가 쉽도록 어느 정도 의역을 포함하며 번역하는 편입니다.</p>
    </section>

    <section id="trivia">
      <h3 class="text-lime-600">trivia</h3>
      <h2>{ $_("main.section.trivia.title") }</h2>

      <p class="jujeori">어렸을 때 우연한 계기로 <b>피아노</b>를 배웠고, 피아노라는 악기에 매료되어 지금까지도 이따금씩 좋아하는 곡을 연습합니다. 사용하는 디지털 피아노는 <b>커즈와일 Ka E1</b>입니다.</p>
      <p class="jujeori"><b>서브컬처</b>를 좋아합니다. 첫 서브컬처 입문은 <b>하츠네 미쿠</b>였고, 동시에 작곡에 대한 꿈도 가졌습니다. <s>작곡이 호락호락한 분야가 아닌 걸 느낀 후로는 꿈만 가지고 있습니다.</s> 좋아하는 미쿠 곡은 <b>livetune - Hand in Hand</b>, <b>DECO*27, kemu - SEKAI</b> 입니다.</p>
      <p class="jujeori"><b>서브컬처 모바일 게임</b>도 여럿 해보았고, 이런 게임의 스탭 롤에 제 이름이 들어가는 게 목표입니다. 현재 최애는 <a href="https://bluearchive.nexon.com/" target="_blank">블루 아카이브</a>의 <b>프라나</b>입니다.</p>
      <p class="jujeori">PC로는 주로 싱글 플레이어 위주의 게임을 합니다. 제 개인 Top 3는 <b>Red Dead Redemption 2</b>, <b>Oxygen Not Included</b>, <b>Ori 시리즈</b>입니다.</p>
      <p class="jujeori"><br /></p>
      <p class="jujeori">현실과 인터넷 어딘가에서 이러한 취미들을 열심히 향유하고 있습니다.</p>
    </section>

    <section id="links">
      <h3 class="text-amber-600">links</h3>

      {#each data.linkData as category}
        <div class="link-category">
          <div class="link-category-title">● { $_(category.nameTextId) }</div>

          <ul>
            {#each category.links as link}
              <li class="link">
                <a href={ link.url }>{ $_(link.nameTextId) } ({ link.accountDisplayId })</a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </section>
  </div>
</div>

<script lang="ts">
import gsap from "gsap";
import { onMount } from "svelte";
import { _, locale, locales, waitLocale } from "svelte-i18n";
import { fade } from "svelte/transition";
import stringToColor from "string-to-color";
import MainTransitionOverlay from "$/components/animation/MainTransitionOverlay.svelte";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { siCss, siFmod, siNestjs, siSass, siSvelte, siTypescript, siUnity, siVuedotjs } from "simple-icons";
import IconText from "$/components/common/IconText.svelte";
import faChevronDown from "$/assets/icons/ui/fa-chevron-down.svg?raw";
import type { PageProps } from "./$types";

const typingUrlMap: Record<string, string> = {
  "mail": "mailto:" + atob("bWU=") + "@" + atob("c29tbmkub25l"),
  "email": "mailto:" + atob("bWU=") + "@" + atob("c29tbmkub25l"),

  "twitter": "https://twitter.com/somni_somni",
  "x": "https://twitter.com/somni_somni",

  "bluesky": "https://bsky.app/profile/somni.one",
  "bsky": "https://bsky.app/profile/somni.one",

  "github": "https://github.com/somnisomni",
  "git": "https://github.com/somnisomni",

  "blog": "https://log.somni.one",
  "log": "https://log.somni.one",

  "portfolio": "/works",
  "project": "/works",
  "projects": "/works",
  "work": "/works",
  "works": "/works",
  "resume": "/works",
  "cv": "/works",
};

const typingActionMap: Record<string, () => void> = {
  "english": () => changeLanguage("en"),
  "en": () => changeLanguage("en"),
  "eng": () => changeLanguage("en"),

  "korean": () => changeLanguage("ko"),
  "ko": () => changeLanguage("ko"),
  "kor": () => changeLanguage("ko"),
  "hangul": () => changeLanguage("ko"),
  "hangeul": () => changeLanguage("ko"),

  "japanese": () => changeLanguage("ja"),
  "ja": () => changeLanguage("ja"),
  "jpn": () => changeLanguage("ja"),

  "arona": () => alert("NO PINK ENVELOPES"),
  "plana": () => alert("Love"),
  "koharu": () => alert("ECCHINA NO WA DAME! SHIKEI!"),
  "seia": () => alert("🔇"),
};

function changeLanguage(lang: string) {
  if(lang === $locale) {
    return;
  }

  animateText(async () => {
    await locale.set(lang);
    await waitLocale();
  });
}

let mainTransitionOverlay: MainTransitionOverlay | null = $state(null);
let headlineElement: HTMLElement[] = $state([]);
let scrollDownElement: HTMLElement | null = $state(null);

let additionalTypings: string = $state("");
let additionalTypingsSpans: HTMLElement[] = $state([]);
let additionalTypingsUrl: string = $derived(
  additionalTypings.toLowerCase() in typingUrlMap
    ? typingUrlMap[additionalTypings.toLowerCase()]
    : additionalTypings.toLowerCase() in typingActionMap
      ? "#"
      : "");
let additionalTypingsUrlAnchor: HTMLAnchorElement | null = null;

let windowScrollY: number = $state(0);

const { data }: PageProps = $props();

onMount(() => {
  animateText(null, true);

  ScrollSmoother.create({
    smooth: 0.5,
    smoothTouch: 0,
    effects: true,
    autoResize: true,
  });
});

$effect(() => {
  if(scrollDownElement) {
    gsap.to(scrollDownElement, {
      yPercent: 20,
      yoyo: true,
      repeat: -1,
      duration: 2,
      ease: "sine.inOut",
    });
  }
});

function onKeyDown(event: KeyboardEvent) {
  if(event.key.match(/^[a-zA-Z0-9`!@#$%^&*,.;:'"(){}\[\]/\\\-=_+ ]$/)
    && additionalTypings.length <= 20) {
    const newSpan = document.createElement("span");
    newSpan.innerHTML = event.key === " " ? "&nbsp;" : event.key;
    newSpan.style.display = "inline-block";
    additionalTypingsSpans.push(newSpan);
    animateTypeIn(newSpan);

    additionalTypings += event.key;
  } else if(event.key === "Backspace") {
    additionalTypingsSpans.pop();

    additionalTypings = additionalTypings.slice(0, -1);
  } else if(event.key === "Enter" && event.ctrlKey) {
    if(additionalTypings.toLowerCase() in typingActionMap) {
      typingActionMap[additionalTypings.toLowerCase()]();
      additionalTypingsSpans = [];

      additionalTypings = "";
    } else if(additionalTypingsUrlAnchor) {
      additionalTypingsUrlAnchor.click();
    }
  } else if(event.key === "Escape") {
    additionalTypingsSpans = [];
    additionalTypings = "";
  }

  if(additionalTypingsUrlAnchor) {
    additionalTypingsUrlAnchor.replaceChildren(...additionalTypingsSpans);
  }
}

function animateTypeIn(targetElement: HTMLElement) {
  gsap.set(targetElement, {
    yPercent: 10,
    opacity: 0,
  });
  gsap.to(targetElement, {
    yPercent: 0,
    opacity: 1,
    duration: 0.25,
    ease: "power2.out",
  });
}

async function animateText(onCover: (() => void | Promise<void>) | null = null, firstLoad = false) {
  if(!mainTransitionOverlay) {
    return;
  }

  const outTimeline = gsap.timeline({ paused: true });
  const inTimeline = gsap.timeline({ paused: true });

  // Out timeline setup
  {
    if(!firstLoad) {
      outTimeline.add(mainTransitionOverlay.slideIn());

      outTimeline.to(headlineElement, {
        opacity: 0,
        xPercent: 10,
        stagger: 0.1,
        ease: "power2.in",
      }, "<");

      for(const h2 of document.querySelectorAll("section > h2")) {
        outTimeline.to(h2, {
          opacity: 0,
          xPercent: 5,
          ease: "power2.in",
        }, "<");
      }
    } else {
      outTimeline.set(headlineElement, {
        opacity: 0,
        xPercent: -10,
      });

      for(const h2 of document.querySelectorAll("section > h2")) {
        outTimeline.set(h2, {
          opacity: 0,
          xPercent: 5,
        });
      }
    }
  }

  // In timeline setup
  {
    if(!firstLoad) {
      inTimeline.add(mainTransitionOverlay.slideOut());
    }

    outTimeline.set(headlineElement, {
      opacity: 0,
      xPercent: -10,
    });

    inTimeline.to(headlineElement, {
        opacity: 1,
        xPercent: 0,
        stagger: 0.1,
        ease: "power2.out",
      }, "<");
  }

  // Actual animation
  outTimeline.play();
  await outTimeline.then();
  await onCover?.();
  inTimeline.play();

  // Set up scroll trigger animations
  for(const h2 of document.querySelectorAll("section > h2")) {
    gsap.set(h2, {
      opacity: 0,
      xPercent: -5,
    });

    gsap.to(h2, {
      scrollTrigger: h2,
      opacity: 1,
      xPercent: 0,
      ease: "power2.out",
    });
  }
}

function textToColorHtml(text: string) {
  const color = stringToColor(`darken ${text}`);
  return `<span style="color: ${color}">${text}</span>`;
}
</script>

<style scoped>
@reference "$/styles/app.css";

nav#language-switcher .current {
  @apply underline;
}

section {
  @apply flex flex-col min-h-screen items-start justify-start;
  @apply p-4
         sm:p-8
         lg:p-12
         xl:p-16;
  @apply mb-8
         lg:mb-16;
  @apply w-full
         xl:w-[75%];
}

section#headline {
  @apply items-start justify-center;
}

section#headline .headline-text {
  @apply flex flex-col font-[550];
  @apply text-[3rem]
         sm:text-[4rem]
         lg:text-[6rem]
         xl:text-[7rem];

  line-height: 1.33;
}

section#headline .headline-text > :first-child,
section#headline .headline-text > :last-child {
  @apply text-zinc-400;

  font-size: 0.33em;
  line-height: 3;
}

:global(section#headline .headline-text strong) {
  @apply font-black;
}

section#headline .user-typings {
  @apply flex items-center break-all font-mono;
}

section#headline a.user-typings-url[href=""] {
  @apply pointer-events-none;
}

section#headline a.user-typings-url:not([href=""]),
:global(section#headline a.user-typings-url:not([href=""]) > *) {
  @apply underline;
}

section#headline .user-typings-url-hint {
  @apply font-sans font-light text-[0.4em] p-[0.6em] shadow-md rounded-full;

  line-height: 1;
}

section#headline .cursor {
  @apply pointer-events-none select-none;

  animation: fadeInOut 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

section h2 {
  @apply font-extrabold my-8;
  @apply text-[2.5rem]
         sm:text-[3.5rem];

  line-height: 1.2;
}

section h3 {
  @apply font-mono font-light text-nowrap lowercase;
  @apply text-[1rem]
         sm:text-[1.5rem];
}

section h3::before {
  content: "> ";
}

section .jujeori {
  @apply font-light text-zinc-400 indent-2;
  @apply text-[1.2rem]
         sm:text-[1.33rem]
         md:text-[1.5rem];

  line-height: 2;
}

section .jujeori b {
  @apply font-bold;
}

section .jujeori s {
  @apply text-zinc-300;
}

section .jujeori a {
  @apply underline;
}
</style>
