<MeDataItemBase idPrefix="contribution-translation"
                item={item}>
  <ul>
    {#if item.platform === "github"}
      {#each item.githubPullRequests ?? [] as pullRequest}
        <li>
          <MeDataGitHubPullRequestItem repositoryUrl={item.repositoryUrl}
                                       pullRequestNumber={pullRequest} />
        </li>
      {/each}

      {#each item.directCommits ?? [] as directCommit}
        <li>
          <MeDataGitHubCommitItem repositoryUrl={item.repositoryUrl}
                                  commitHash={directCommit} />
        </li>
      {/each}
    {:else}
      <li>
        <a href={item.proofUrl}
          class="inline-block *:mr-2">
          {#if item.platform === "weblate"}
            <span class="float-left w-6 h-6"
                  style:fill="#{siWeblate.hex}">{@html siWeblate.svg}</span>
            <span>{$_("me.contrib.translation.weblate.proof")}</span>
          {:else if item.platform === "transifex"}
            <span class="float-left w-6 h-6"
                  style:fill="#{siTransifex.hex}">{@html siTransifex.svg}</span>
            <span>{$_("me.contrib.translation.transifex.proof")}</span>
          {/if}
        </a>
      </li>
    {/if}
  </ul>
</MeDataItemBase>

<script lang="ts">
import MeDataItemBase from "$/components/me/item/base/MeDataItemBase.svelte";
import MeDataGitHubCommitItem from "$/components/me/fragments/MeDataGitHubCommitItem.svelte";
import MeDataGitHubPullRequestItem from "$/components/me/fragments/MeDataGitHubPullRequestItem.svelte";
import type { MeContributionTranslationData } from "$/lib/typings/me-data";
import { _ } from "svelte-i18n";
import { siTransifex, siWeblate } from "simple-icons";

const { item }: { item: MeContributionTranslationData } = $props();
</script>
