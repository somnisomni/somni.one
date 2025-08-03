<MeDataItemBase idPrefix="contribution-translation"
                item={item}>
  <ul>
    {#if item.platform === "github" && item.contributions}
      {#each item.contributions ?? [] as contribution}
        <li>
          {#if contribution.type === "pull-request"}
            <MeDataGitHubPullRequestItem dataType={WorksDataType.CONTRIBUTION_TRANSLATION}
                                         dataId={item.id}
                                         pullRequestNumber={contribution.pr} />
          {:else if contribution.type === "direct-commit"}
            <MeDataGitHubCommitItem dataType={WorksDataType.CONTRIBUTION_TRANSLATION}
                                    dataId={item.id}
                                    commitHash={contribution.commit} />
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
</MeDataItemBase>

<script lang="ts">
import MeDataItemBase from "$/components/me/item/base/MeDataItemBase.svelte";
import MeDataGitHubCommitItem from "$/components/me/fragments/MeDataGitHubCommitItem.svelte";
import MeDataGitHubPullRequestItem from "$/components/me/fragments/MeDataGitHubPullRequestItem.svelte";
import { _ } from "svelte-i18n";
import { siTransifex, siWeblate } from "simple-icons";
import type { ContributionTranslationData } from "@somni.one/common";
import { WorksDataType } from "$/lib/typings/works-data";

const { item }: { item: ContributionTranslationData } = $props();
</script>
