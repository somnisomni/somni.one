<svelte:window on:keydown={ onKeyDown } />

<section id="headline">
  <div class="max-w-full">
    <h1 class="headline-text">
      <p class="font-mono">&gt; somni</p>
      <p>{ $_("main.headline.line1") }</p>
      <p>{ $_("main.headline.line2") }</p>
      <p>{@html $_("main.headline.line3")}</p>
      <p class="user-typings">
        <span>
          <a bind:this={ additionalTypingsUrlAnchor }
             class="user-typings-url"
             href={ additionalTypingsUrl }>
            {@html additionalTypingsHtml}
          </a>
        </span><!--

     --><span class="cursor ml-2">▏</span>
        {#if additionalTypingsUrl }
          <span in:fade out:fade
                class="user-typings-url-hint">Ctrl + Enter</span>
        {/if}
      </p>
    </h1>
  </div>
</section>

<script lang="ts">
import { _, locale } from "svelte-i18n";
import { fade } from "svelte/transition";

const typingUrlMap: Record<string, string> = {
  "mail": "mailto:" + atob("bWU=") + "@" + atob("c29tbmkub25l"),
  "email": "mailto:" + atob("bWU=") + "@" + atob("c29tbmkub25l"),

  "twitter": "https://twitter.com/somni_somni",
  "x": "https://twitter.com/somni_somni",

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
  "english": () => locale.set("en"),
  "en": () => locale.set("en"),

  "korean": () => locale.set("ko"),
  "ko": () => locale.set("ko"),

  "japanese": () => locale.set("ja"),
  "ja": () => locale.set("ja"),
};

let additionalTypings: string = $state("");
let additionalTypingsHtml: string = $derived(additionalTypings.replace(/ /g, "&nbsp;"));
let additionalTypingsUrl: string = $derived(
  additionalTypings.toLowerCase() in typingUrlMap
    ? typingUrlMap[additionalTypings.toLowerCase()]
    : additionalTypings.toLowerCase() in typingActionMap
      ? "#"
      : "");
let additionalTypingsUrlAnchor: HTMLAnchorElement | null = null;

function onKeyDown(event: KeyboardEvent) {
  if(event.key.match(/^[a-zA-Z0-9`!@#$%^&*,.;:'"<>(){}\[\]/\\ ]$/)
    && additionalTypings.length <= 20) {
    additionalTypings += event.key;
  } else if(event.key === "Backspace") {
    additionalTypings = additionalTypings.slice(0, -1);
  } else if(event.key === "Enter" && event.ctrlKey) {
    if(additionalTypings.toLowerCase() in typingActionMap) {
      typingActionMap[additionalTypings.toLowerCase()]();
      additionalTypings = "";
      return;
    }

    if(additionalTypingsUrlAnchor) {
      additionalTypingsUrlAnchor.click();
    }
  } else if(event.key === "Escape") {
    additionalTypings = "";
  }
}
</script>

<style scoped>
@reference "$/styles/app.css";

section {
  @apply flex w-full h-screen items-center justify-center;
}

section#headline {
  @apply flex-col items-start p-8;
}

section#headline .headline-text {
  @apply flex flex-col font-medium;

  font-size: 8rem;
  line-height: 1.33;
}

section#headline .headline-text > :first-child,
section#headline .headline-text > :last-child {
  @apply text-zinc-400;

  font-size: 0.5em;
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

section#headline a.user-typings-url:not([href=""]) {
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
