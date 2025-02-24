<MeDataItemBase idPrefix="contribution-translation"
                item={item}>
  <ul>
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
  </ul>
</MeDataItemBase>

<script lang="ts">
import MeDataItemBase from "$/components/me/item/base/MeDataItemBase.svelte";
import MeDataGitHubCommitItem from "$/components/me/MeDataGitHubCommitItem.svelte";
import MeDataGitHubPullRequestItem from "$/components/me/MeDataGitHubPullRequestItem.svelte";
import type { MeContributionTranslationData } from "$/lib/typings/me-data";

const { item }: { item: MeContributionTranslationData } = $props();
</script>
