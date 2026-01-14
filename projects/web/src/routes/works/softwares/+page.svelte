<div class="page">

  {#each projects as project}
    <WorkItem { project } />
  {/each}
</div>

<script lang="ts">
import type { ProjectData } from "@somni.one/common";
import WorkItem from "$/components/WorkItem.svelte";
import SoftwareWorks from "@somni.one/common/data/works/projects/software.json";

const projects = (SoftwareWorks as ProjectData[]).sort((a, b) => b.yearFrom - a.yearFrom);
</script>
