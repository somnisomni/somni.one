<WorkTagListBase data={ contribution }
                 { evaluators } />

<script lang="ts">
import { type ContributionDataBase, type ContributionTranslationData } from "@somni.one/common";
import WorkTagListBase, { type WorkItemTagEvaluator } from "./WorkTagListBase.svelte";

const { contribution }: { contribution: ContributionDataBase } = $props();
</script>

<script lang="ts" module>
const evaluators: WorkItemTagEvaluator<ContributionDataBase> = {
  evaluators: [
    {
      tag: {
        id: "code-contribution",
        color: {
          light: "000000",
          dark: "FFFFFF",
        },
        labelKey: "works.tags.codeContribution",
      },
      evaluate(data: ContributionDataBase) {
        return !(data as ContributionTranslationData).langFromTo;
      },
    },
    {
      tag: {
        id: "translation",
        color: {
          light: "000000",
          dark: "FFFFFF",
        },
        labelKey: "works.tags.translation",
      },
      evaluate(data: ContributionDataBase) {
        return !!(data as ContributionTranslationData).langFromTo;
      },
    },
  ],
};
</script>
