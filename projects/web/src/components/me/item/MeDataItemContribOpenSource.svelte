<MeDataItemBase idPrefix="contribution-opensource"
                item={item}>
  <ul>
    {#each item.contributions as contribution}
      <li class="mb-2">
        {#if contribution.type === "pull-request"}
          <MeDataGitHubPullRequestItem dataType={WorksDataType.CONTRIBUTION_OPENSOURCE}
                                       dataId={item.id}
                                       pullRequestNumber={contribution.pr} />
        {:else if contribution.type === "direct-commit"}
          <MeDataGitHubCommitItem dataType={WorksDataType.CONTRIBUTION_OPENSOURCE}
                                  dataId={item.id}
                                  commitHash={contribution.commit} />
        {/if}

        <div class="text-sm ml-4">→ {contribution.desc}</div>
      </li>
    {/each}
  </ul>
</MeDataItemBase>

<script lang="ts">
import MeDataItemBase from "$/components/me/item/base/MeDataItemBase.svelte";
import MeDataGitHubCommitItem from "$/components/me/fragments/MeDataGitHubCommitItem.svelte";
import MeDataGitHubPullRequestItem from "$/components/me/fragments/MeDataGitHubPullRequestItem.svelte";
import type { ContributionOpenSourceData } from "@somni.one/common";
import { WorksDataType } from "$/lib/typings/works-data";

const { item }: { item: ContributionOpenSourceData } = $props();
</script>
