<WorkItemBase idPrefix="contribution-opensource"
                item={item}>
  <ul>
    {#each item.contributions as contribution}
      <li class="mb-2">
        {#if contribution.type === "pull-request" && contribution.pr in prData}
          <GitHubPullRequest data={prData[contribution.pr]}
                             displayPullRequestNumber={contribution.pr} />
        {:else if contribution.type === "direct-commit" && contribution.commit in commitData}
          <GitHubCommit data={commitData[contribution.commit]}
                        displayCommit={contribution.commit} />
        {/if}

        <div class="text-sm ml-4">→ {contribution.desc}</div>
      </li>
    {/each}
  </ul>
</WorkItemBase>

<script lang="ts">
import type { ContributionOpenSourceData, GitHubCommitData, GitHubPullRequestData } from "@somni.one/common";
import WorkItemBase from "$/components/works/items/base/WorkItemBase.svelte";
import GitHubPullRequest from "$/components/works/fragments/GitHubPullRequest.svelte";
import GitHubCommit from "$/components/works/fragments/GitHubCommit.svelte";

const { item, prData, commitData }: { item: ContributionOpenSourceData, prData: Record<number, GitHubPullRequestData>, commitData: Record<string, GitHubCommitData> } = $props();
</script>
