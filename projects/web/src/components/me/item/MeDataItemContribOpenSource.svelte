<MeDataItemBase idPrefix="contribution-opensource"
                item={item}>
  <ul>
    {#each item.contributions as contribution}
      <li class="mb-2">
        {#if contribution.pullRequest}
          <MeDataGitHubPullRequestItem dataType={MeDataType.CONTRIBUTION_OPENSOURCE}
                                       dataId={item.id}
                                       pullRequestNumber={contribution.pullRequest} />
        {:else if contribution.directCommit}
          <MeDataGitHubCommitItem dataType={MeDataType.CONTRIBUTION_OPENSOURCE}
                                  dataId={item.id}
                                  commitHash={contribution.directCommit} />
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
import { MeDataType, type MeContributionOpenSourceData } from "$/lib/typings/me-data";

const { item }: { item: MeContributionOpenSourceData } = $props();
</script>
