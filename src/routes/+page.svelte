<svelte:window onkeydown={ onKeyDown } />

<div bind:this={ blendOverlay }
     class="block w-full h-full top-0 right-0 left-0 bottom-0 mix-blend-difference fixed pointer-events-none bg-zinc-50 opacity-0"></div>

<section id="headline">
  <div class="max-w-full">
    <h1 class="headline-text">
      <p class="font-mono font-light text-nowrap">
        <span class="font-medium">&gt; somni &lt;</span>
        <span style={ `color: ${stringToColor("web-dav")}` }>web-dev</span>
        <span style={ `color: ${stringToColor("game-dev")}` }>game-dev</span>
        <span style={ `color: ${stringToColor("translation")}` }>translation</span>
      </p>
      <p bind:this={ headlineElement[0] }>{ $_("main.headline.line1") }</p>
      <p bind:this={ headlineElement[1] }>{ $_("main.headline.line2") }</p>
      <p bind:this={ headlineElement[2] }>{@html $_("main.headline.line3", { values: { emphasize: textToColorHtml($_("main.headline.emphasize")) }})}</p>
      <p class="user-typings overflow-clip">
        <span>
          <a bind:this={ additionalTypingsUrlAnchor }
             class="user-typings-url"
             href={ additionalTypingsUrl }>
            <!-- Will be filled by typing -->
          </a>
        </span><!--

     --><span class="cursor ml-0.5">▏</span>
        {#if additionalTypingsUrl}
          <span in:fade out:fade
                class="user-typings-url-hint">Ctrl + Enter</span>
        {/if}
      </p>
    </h1>
  </div>
</section>

<script lang="ts">
import gsap from "gsap";
import { onMount } from "svelte";
import { _, locale } from "svelte-i18n";
import { fade } from "svelte/transition";
import stringToColor from "string-to-color";

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

  "me": "/me",
  "portfolio": "/me",
  "project": "/me",
  "projects": "/me",
  "work": "/me",
  "works": "/me",
  "resume": "/me",
  "cv": "/me",
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
};

function changeLanguage(lang: string) {
  if(lang === $locale) {
    return;
  }

  animateHeadline(() => {
    locale.set(lang);
  });
}

let blendOverlay: HTMLElement | null = null;
let headlineElement: HTMLElement[] = [];

let additionalTypings: string = $state("");
let additionalTypingsSpans: HTMLElement[] = $state([]);
let additionalTypingsUrl: string = $derived(
  additionalTypings.toLowerCase() in typingUrlMap
    ? typingUrlMap[additionalTypings.toLowerCase()]
    : additionalTypings.toLowerCase() in typingActionMap
      ? "#"
      : "");
let additionalTypingsUrlAnchor: HTMLAnchorElement | null = null;

onMount(() => {
  animateHeadline(null, true);
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

function animateHeadline(onCover: (() => void) | null = null, firstLoad = false) {
  const headlineTimeline = gsap.timeline();

  headlineTimeline.set(blendOverlay, {
    scaleX: 0,
    opacity: 1,
    transformOrigin: "left",
  });

  if(!firstLoad) {
    headlineTimeline
      .to(headlineElement, {
        opacity: 0,
        xPercent: 10,
        stagger: 0.1,
        ease: "power2.out",
      })
  } else {
    headlineTimeline.set(headlineElement, {
      opacity: 0,
      xPercent: -10,
    });
  }

  headlineTimeline
    .to(blendOverlay, {
      scaleX: 1,
      transformOrigin: "left",
      ease: "power2.out",
    }, "<");

  headlineTimeline.set(headlineElement, {
    opacity: 0,
    xPercent: -10,
  });

  headlineTimeline.call(() => onCover?.());

  headlineTimeline
    .to(blendOverlay, {
      scaleX: 0,
      transformOrigin: "right",
      delay: 0.2,
      ease: "power2.out",
    })
    .to(headlineElement, {
      opacity: 1,
      xPercent: 0,
      stagger: 0.1,
      ease: "power2.out",
    }, "<");
}

function textToColorHtml(text: string) {
  const color = stringToColor(`darken ${text}`);
  return `<span style="color: ${color}">${text}</span>`;
}
</script>

<style scoped>
@reference "$/styles/app.css";

section {
  @apply flex w-full h-screen items-center justify-center;
}

section#headline {
  @apply flex-col items-start;
  @apply p-4
         sm:p-8
         lg:p-12
         xl:p-16;
}

section#headline .headline-text {
  @apply flex flex-col font-medium;
  @apply text-[3rem]
         sm:text-[4rem]
         lg:text-[6rem]
         xl:text-[7rem];

  line-height: 1.33;
}

section#headline .headline-text > :first-child,
section#headline .headline-text > :last-child {
  @apply text-zinc-400;

  font-size: 0.4em;
  line-height: 3;
}

:global(section#headline .headline-text strong) {
  @apply font-black;
}

section#headline .user-typings {
  @apply break-all font-mono;
}

section#headline a.user-typings-url[href=""] {
  @apply pointer-events-none;
}

section#headline a.user-typings-url:not([href=""]),
:global(section#headline a.user-typings-url:not([href=""]) > *) {
  @apply underline;
}

section#headline .user-typings-url-hint {
  @apply font-light opacity-50;

  font-size: 0.5em;
}

section#headline .cursor {
  @apply pointer-events-none select-none;

  animation: fadeInOut 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}
</style>
