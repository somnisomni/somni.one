<div class="contribution-item p-4 border border-background-inverse/20 rounded-lg">
  <div class="flex flex-row flex-wrap items-center gap-2">
    <span class="text-2xl font-semibold">{@html contribution.title}</span>

    <div class="flex flex-row justify-end items-center grow shrink-0 gap-2">
      <ContributionWorkTagList { contribution } />

      {#if contribution.proofUrl}
        <a href={ contribution.proofUrl }
          target="_blank"
          class="contribution-item-link">
          <SquareArrowOutUpRightIcon />
        </a>
      {:else if contribution.repositoryUrl}
        <a href={ contribution.repositoryUrl }
          target="_blank"
          class="contribution-item-link">
          <GitForkIcon />
        </a>
      {/if}
    </div>
  </div>

  {#if contribData}
    <ul class="mt-2">
      {#each contribData as data}
        <li class="font-mono text-sm opacity-50 transition-opacity hover:opacity-80">
          <a href={ data.url }
             target="_blank">
            <span>{ data.title }</span>

            {#if data.changes}
              <span style="font-size: smaller">
                <span class="text-[#008800]">+{ data.changes.additions }</span>
                <span class="text-[#AA0000]">-{ data.changes.deletions }</span>
              </span>
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<script lang="ts">
import { generateGitHubCommitId, generateGitHubPullRequestId, sliceGitHubRepoUrl, type ContributionDataBase, type ContributionTranslationData, type GitHubCommitData, type GitHubPullRequestData } from "@somni.one/common";
import ContributionWorkTagList from "$/components/works/tags/ContributionWorkTagList.svelte";
import { onMount } from "svelte";
import { requestGetData } from "$/lib/stores/data-collector.svelte";
import { GitForkIcon, SquareArrowOutUpRightIcon } from "@lucide/svelte";

const { contribution }: { contribution: ContributionDataBase } = $props();
let contribData: (GitHubCommitData | GitHubPullRequestData)[] | null = $state(null);

onMount(async () => {
  if(!contribution
    || ((contribution as ContributionTranslationData).platform && (contribution as ContributionTranslationData).platform !== "github")
    || !contribution.contributions
    || !contribution.repositoryUrl) return;

  const repo = sliceGitHubRepoUrl(contribution.repositoryUrl);
  if(!repo) return;

  let dataIdList: string[] = [];

  for(const contrib of contribution.contributions) {
    let id: string;

    switch(contrib.type) {
      case "direct-commit":
        id = generateGitHubCommitId(repo.owner, repo.repo, contrib.commit);
        break;
      case "pull-request":
        id = generateGitHubPullRequestId(repo.owner, repo.repo, contrib.pr);
        break;
    }

    dataIdList.push(id);
  }

  const response = await requestGetData(dataIdList);
  if(!response) return;

  contribData = [];
  contribData.push(
    ...Object.values(response)
      .filter(data => data && data.data)
      .map(data => data.data as GitHubCommitData | GitHubPullRequestData));
});
</script>

<style lang="scss" scoped>
.contribution-item-link {
  @apply fill-current w-6 h-6 opacity-50 hover:opacity-100 transition-opacity duration-200;
}
</style>
