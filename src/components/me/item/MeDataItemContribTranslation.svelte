<MeDataItemBase idPrefix="contribution-translation"
                item={item}>
  <ul>
    {#each item.githubPullRequests ?? [] as pullRequest}
      <li>
        <a>#{pullRequest}</a>
      </li>
    {/each}

    {#each item.directCommits ?? [] as directCommit}
      <li>
        <a>hash {directCommit}</a>
      </li>
    {/each}
  </ul>
</MeDataItemBase>

<script lang="ts">
import MeDataItemBase from "$/components/me/item/base/MeDataItemBase.svelte";
import type { MeContributionTranslationData } from "$/lib/typings/me-data";

const { item }: { item: MeContributionTranslationData } = $props();
</script>
