<ul class="work-tag-list inline-block">
  {#each evaluatedTags as tag}
    <li class="work-tag inline-block mr-2 rounded-full px-2 py-0.5 border border-current font-normal"
          style="--color-on-light: #{ tag.color.light };
                 --color-on-dark:  #{ tag.color.dark ?? tag.color.light };">
      <span>{ $_(tag.labelKey) }</span>
    </li>
  {/each}
</ul>

<script lang="ts" module>
export interface WorkItemTagData {
  id: string;
  labelKey: string;
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
}
</style>
