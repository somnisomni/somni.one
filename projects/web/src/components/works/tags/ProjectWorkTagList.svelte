<WorkTagListBase data={ project }
                 { evaluators } />

<script lang="ts">
import { TechStack, type ProjectData } from "@somni.one/common";
import WorkTagListBase, { type WorkItemTagEvaluator } from "./WorkTagListBase.svelte";

const { project }: { project: ProjectData } = $props();
</script>

<script lang="ts" module>
const evaluators: WorkItemTagEvaluator<ProjectData> = {
  evaluators: [
    {
      tag: {
        id: "personal",
        color: {
          light: "419137",
          dark: "58C44A",
        },
        labelKey: "works.tags.personal",
      },
      evaluate(data: ProjectData) {
        return !data.teamData;
      },
    },
    {
      tag: {
        id: "team",
        color: {
          light: "913774",
          dark: "C44A9B",
        },
        labelKey: "works.tags.team",
      },
      evaluate(data: ProjectData) {
        return !!data.teamData;
      },
    },
    {
      tag: {
        id: "opensource",
        color: {
          light: "368E8F",
          dark: "46B7B8",
        },
        labelKey: "works.tags.opensource",
      },
      evaluate(data: ProjectData) {
        return !!data.repositoryUrl;
      },
    },
    {
      tag: {
        id: "distributing-game",
        color: {
          light: "AD5E28",
          dark: "CE6E30",
        },
        labelKey: "works.tags.distributingGame",
      },
      evaluate(data: ProjectData) {
        return data.stacks.includes(TechStack.UNITY) && !!data.appUrl;
      },
    }
  ],
};
</script>
