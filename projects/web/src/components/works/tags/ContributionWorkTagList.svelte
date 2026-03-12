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
          light: "currentColor",
          dark: "currentColor",
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
          light: "currentColor",
          dark: "currentColor",
        },
        labelKey: "works.tags.translation",
      },
      evaluate(data: ContributionDataBase) {
        return !!(data as ContributionTranslationData).langFromTo;
      },
    },
    {
      tag: {
        id: "non-public-method",
        color: {
          light: "currentColor",
          dark: "currentColor",
        },
        labelKey: "works.tags.nonPublicMethod",
      },
      evaluate(data: ContributionDataBase) {
        return !data.repositoryUrl && !data.proofUrl && !(data.contributions && Object.values(data.contributions).length > 0);
      },
    },
  ],
};
</script>
