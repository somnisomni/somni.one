<ul class="work-tag-list inline-flex gap-2">
  {#each evaluatedTags as tag}
    <li class="work-tag inline-block rounded-full px-1.5 py-px border border-current font-normal"
          style="--color-on-light: #{ tag.color.light };
                 --color-on-dark:  #{ tag.color.dark ?? tag.color.light };">
      {#if tag.descKey}
        <SpanWithTip notText={ true } tip={ $_(tag.descKey) }>
            <span>{ $_(tag.labelKey) }</span>
        </SpanWithTip>
      {:else}
        <span>{ $_(tag.labelKey) }</span>
      {/if}
    </li>
  {/each}
</ul>

<script lang="ts" module>
export interface WorkItemTagData {
  id: string;
  labelKey: string;
  descKey?: string;
  color: {
    light: string;
    dark?: string;
  };
}

export interface WorkItemTagEvaluator<TData> {
  evaluators: {
    tag: WorkItemTagData;
    evaluate: ((data: TData) => boolean);
  }[];
}
</script>

<script lang="ts">
import SpanWithTip from "$/components/SpanWithTip.svelte";

import { _ } from "svelte-i18n";

const { data, evaluators }: {
  data: any;
  evaluators: WorkItemTagEvaluator<typeof data>;
} = $props();

const evaluatedTags = evaluators.evaluators
  .filter(({ evaluate }) => evaluate(data))
  .map(({ tag }) => tag);
</script>

<style lang="scss">
.work-tag {
  @include by-color-scheme(color, var(--color-on-light), var(--color-on-dark));

  font-size: smaller;
}
</style>
