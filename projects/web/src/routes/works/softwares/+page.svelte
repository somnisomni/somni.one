<div class="page">

  {#each projects as project}
    <ProjectItem { project } />
  {/each}
</div>

<script lang="ts">
import type { ProjectData } from "@somni.one/common";
import ProjectItem from "$/components/works/ProjectItem.svelte";
import SoftwareWorks from "@somni.one/common/data/works/projects/software.json";

const projects = (SoftwareWorks as ProjectData[]).sort((a, b) => b.yearFrom - a.yearFrom);
</script>
