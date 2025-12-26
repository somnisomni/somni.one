<LinkAnchor { linkId }>
  <div class="link-item { !linkItem.url ? 'no-url' : '' }"
       onpointerenter={ () => hover = true }
       onpointerleave={ () => hover = false }>
    {#if linkIcon}
      <div class="link-icon">
        {@html linkIcon}
      </div>
    {/if}

    <div class="link-content">
      <span class="name">{ $_(linkItem.labelKey) }</span>
      {#if linkId === "email"}
        <span class="userId">
          {#if !hover}
            <span class="opacity-50">[ { $_("links.email.hoverToReveal") } ]</span>
          {:else}
            <span>{ decodedEmailAddress }</span>
          {/if}
        </span>
      {:else}
        <span class="userId">{ linkItem.userId }</span>
      {/if}
    </div>

    <div class="extra-info">
      {#if extraData}
        <p class="extra-data">{ extraData }</p>
      {/if}

      {#if linkItem.url}
        <div class="link-navigation-icon">
          {#if linkId === "email"}
            {@html faCopy}
          {:else}
            {@html faSquareArrowUp}
          {/if}
        </div>
      {/if}
    </div>
  </div>
</LinkAnchor>

<script lang="ts">
import { getLinkIconHtml, type Link } from "$/lib/data/links/links";
import LinkAnchor from "$/components/LinkAnchor.svelte";
import LinkData from "$/lib/data/links/links.json";
import { _ } from "svelte-i18n";
import faCopy from "$assets/icons/fa-copy-solid-full.svg?raw";
import faSquareArrowUp from "$assets/icons/fa-square-arrow-up-right-solid-full.svg?raw";
import { onMount } from "svelte";
import { requestGetData } from "$/lib/stores/data-collector.svelte";
import { generateGitHubUserId, generateMonkeytypeUserId, generateSteamUserId, type GitHubUserData, type MonkeytypeUserData, type SteamUserData } from "@somni.one/common";
import { decodeEmailAddress } from "$/lib/data/email";

const { linkId }: { linkId: keyof typeof LinkData } = $props();

const linkItem = $derived((LinkData as Record<string, Link>)[linkId]);
const linkIcon = $derived(getLinkIconHtml(linkId));
let hover: boolean = $state(false);
let decodedEmailAddress: string = $derived(linkItem.url && hover ? decodeEmailAddress(linkItem.url) : "");
let extraData: string | null = $state(null);

onMount(async () => {
  switch(linkId) {
    case "github":
      {
        const id = generateGitHubUserId(linkItem.userId!);
        const data = ((await requestGetData([ id ]))?.[id])?.data as GitHubUserData;
        if(!data) break;

        const publicRepos = data.publicRepos.toLocaleString();
        const followers = data.followers.toLocaleString();

        const publicReposStr = $_("links.github.extra.publicRepos", { values: { value: publicRepos } });
        const followersStr = $_("links.github.extra.followers", { values: { value: followers } });

        extraData = `${publicReposStr}\n${followersStr}`;
      }
      break;
    case "monkeytype":
      {
        const id = generateMonkeytypeUserId();
        const data = ((await requestGetData([ id ]))?.[id])?.data as MonkeytypeUserData;
        if(!data) break;

        const lastTestDuration = data.lastResult.testDuration.toLocaleString();
        const lastWpm = data.lastResult.wpm.toLocaleString();
        const lastAcc = data.lastResult.acc.toLocaleString();

        const lastResultTitle = $_("links.monkeytype.extra.lastResultTitleFormat", { values: { duration: lastTestDuration } });
        const lastResultContent = $_("links.monkeytype.extra.lastResultContentFormat", { values: { wpm: lastWpm, acc: lastAcc } });

        extraData = `${lastResultTitle}\n${lastResultContent}`;
      }
      break;
    case "steam":
      {
        const id = generateSteamUserId(linkItem.userId!);
        const data = ((await requestGetData([ id ]))?.[id])?.data as SteamUserData;
        if(!data || !data.lastPlayedGame) break;

        const lastPlayedGameTotalHours = (data.lastPlayedGame.totalPlayTimeMinutes / 60).toLocaleString(undefined, { maximumFractionDigits: 1 });

        const lastPlayedGameTitle = $_("links.steam.extra.lastPlayedGameTitle");
        const lastPlayedGameContent = $_("links.steam.extra.lastPlayedGameFormat", { values: { name: data.lastPlayedGame.name, hours: lastPlayedGameTotalHours } });

        extraData = `${lastPlayedGameTitle}\n${lastPlayedGameContent}`;
      }
    default:
      break;
  }
})
</script>

<style lang="scss" scoped>
@reference "$/styles/app.css";

.link-item {
  @apply relative flex flex-row items-center justify-start w-full h-full px-6 py-4 border rounded-lg;
  @apply scale-100 border-background-inverse/20 transition-[scale,border-color] duration-200 ease-out;

  &:hover {
    @apply scale-102 border-background-inverse;
    @apply /* < md */ max-md:scale-105;

    &:not(.no-url):active {
      @apply scale-101;
      @apply /* < md */ max-md:scale-103;
    }
  }

  .link-icon {
    @apply w-6 h-6 mr-4 fill-background-inverse;
  }

  .link-content {
    @apply flex flex-col justify-center items-start;

    .name {
      @apply text-xl font-semibold;
    }

    .userId {
      @apply text-sm font-light;
    }
  }
}

.extra-info {
  @apply absolute right-0 px-[inherit] flex flex-row items-center justify-end text-end text-background-inverse/50 fill-background-inverse/50;

  .extra-data {
    @apply text-sm whitespace-pre-line text-end;
    @apply /* < md */ max-md:hidden;
  }

  .link-navigation-icon {
    @apply *:w-8 *:h-8 ml-2;
  }
}
</style>
