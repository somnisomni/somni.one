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
        id: "status-ongoing",
        color: {
          light: "2E5EE5",
          dark: "8AA8FF",
        },
        labelKey: "works.tags.statusOngoing.label",
        descKey: "works.tags.statusOngoing.desc",
      },
      evaluate(data: ProjectData) {
        return data.status === "ongoing";
      },
    },
    {
      tag: {
        id: "status-completed",
        color: {
          light: "1AA11A",
          dark: "4DD44D",
        },
        labelKey: "works.tags.statusCompleted.label",
        descKey: "works.tags.statusCompleted.desc",
      },
      evaluate(data: ProjectData) {
        return data.status === "completed";
      },
    },
    {
      tag: {
        id: "status-maintaining",
        color: {
          light: "2A64F4",
          dark: "4A7CFA",
        },
        labelKey: "works.tags.statusMaintaining.label",
        descKey: "works.tags.statusMaintaining.desc",
      },
      evaluate(data: ProjectData) {
        return data.status === "maintaining";
      },
    },
    {
      tag: {
        id: "status-discontinued",
        color: {
          light: "E95555",
          dark: "C95555",
        },
        labelKey: "works.tags.statusDiscontinued.label",
        descKey: "works.tags.statusDiscontinued.desc",
      },
      evaluate(data: ProjectData) {
        return data.status === "discontinued";
      },
    },
    {
      tag: {
        id: "self-initiated",
        color: {
          light: "419137",
          dark: "58C44A",
        },
        labelKey: "works.tags.selfInitiated.label",
        descKey: "works.tags.selfInitiated.desc",
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
        labelKey: "works.tags.team.label",
        descKey: "works.tags.team.desc",
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
        labelKey: "works.tags.opensource.label",
        descKey: "works.tags.opensource.desc",
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
        labelKey: "works.tags.distributingGame.label",
        descKey: "works.tags.distributingGame.desc",
      },
      evaluate(data: ProjectData) {
        return data.stacks.includes(TechStack.UNITY) && !!data.appUrl;
      },
    },
  ],
};
</script>
