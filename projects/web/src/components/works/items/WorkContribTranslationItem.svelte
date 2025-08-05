<WorkItemBase idPrefix="contribution-translation"
                item={item}>
  <ul>
    {#if item.platform === "github" && item.contributions}
      {#each item.contributions ?? [] as contribution}
        <li>
          {#if contribution.type === "pull-request"}
            <GitHubPullRequest data={prData?.[contribution.pr]}
                               displayPullRequestNumber={contribution.pr} />
          {:else if contribution.type === "direct-commit"}
            <GitHubCommit data={commitData?.[contribution.commit]}
                          displayCommit={contribution.commit} />
          {/if}
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
          {:else if item.platform === "direct"}
            <span class="text-zinc-400">(이메일 등 비공개 수단으로 번역 제공)</span>
          {/if}
        </a>
      </li>
    {/if}
  </ul>
</WorkItemBase>

<script lang="ts">
import { _ } from "svelte-i18n";
import { siTransifex, siWeblate } from "simple-icons";
import type { ContributionTranslationData, GitHubCommitData, GitHubPullRequestData } from "@somni.one/common";
import WorkItemBase from "$/components/works/items/base/WorkItemBase.svelte";
import GitHubPullRequest from "$/components/works/fragments/GitHubPullRequest.svelte";
import GitHubCommit from "$/components/works/fragments/GitHubCommit.svelte";

const { item, prData, commitData }: { item: ContributionTranslationData, prData?: Record<number, GitHubPullRequestData>, commitData?: Record<string, GitHubCommitData> } = $props();
</script>
