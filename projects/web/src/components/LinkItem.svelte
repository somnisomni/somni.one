<LinkAnchor { linkId }>
  <div class="link-item">
    {#if linkIcon}
      <div class="link-icon">
        {@html linkIcon}
      </div>
    {/if}

    <div class="link-content">
      <span class="name">{ $_(linkItem.labelKey) }</span>
      <span class="userId">{ linkItem.userId }</span>
    </div>

    <div class="extra-info">
      {#if extraData}
        <p class="extra-data">{ extraData }</p>
      {/if}

      <div class="link-navigation-icon">
        {#if linkId === "email"}
          {@html faCopy}
        {:else}
          {@html faSquareArrowUp}
        {/if}
      </div>
    </div>
  </div>
</LinkAnchor>

<script lang="ts">
import { getLinkIconSvg, type Link } from "$/lib/data/links/links";
import LinkAnchor from "$/components/LinkAnchor.svelte";
import LinkData from "$/lib/data/links/links.json";
import { _ } from "svelte-i18n";
import faCopy from "$assets/icons/fa-copy-solid-full.svg?raw";
import faSquareArrowUp from "$assets/icons/fa-square-arrow-up-right-solid-full.svg?raw";
import { onMount } from "svelte";
import { requestGetData } from "$/lib/stores/data-collector.svelte";
import { generateGitHubUserId, generateMonkeytypeUserId, type GitHubUserData, type MonkeytypeUserData } from "@somni.one/common";

const { linkId }: { linkId: keyof typeof LinkData } = $props();

const linkItem = $derived((LinkData as Record<string, Link>)[linkId]);
const linkIcon = $derived(getLinkIconSvg(linkId));
let extraData: string | null = $state(null);

onMount(async () => {
  switch(linkId) {
    case "github":
      {
        const id = generateGitHubUserId(linkItem.userId!);
        const data = ((await requestGetData([ id ]))?.[id])?.data as GitHubUserData;
        if(!data) break;

        extraData = `Public Repos: ${data.publicRepos}\nFollowers: ${data.followers}`;
      }
      break;
    case "monkeytype":
      {
        const id = generateMonkeytypeUserId();
        const data = ((await requestGetData([ id ]))?.[id])?.data as MonkeytypeUserData;
        if(!data) break;

        extraData = `Last Result (${data.lastResult.testDuration}s)\n${data.lastResult.wpm} WPM, Accuracy ${data.lastResult.acc}%`;
      }
      break;
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

    &:active {
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
