<section id="projects-individual">
  <h1>개인 프로젝트</h1>

  {#each data.projectsIndividual as item}
    <MeDataItemProjectIndividual item={item} />
  {/each}
</section>

<section id="projects-team">
  <h1>팀 프로젝트</h1>

  {#each data.projectsTeam as item}
    <MeDataItemProjectTeam item={item} />
  {/each}
</section>

<section id="contributions-opensource">
  <h1>오픈 소스 프로젝트 기여</h1>

  {#each data.contribOpenSource as item}
    <MeDataItemContribOpenSource item={item} />
  {/each}
</section>

<section id="contributions-translation">
  <h1>번역 기여</h1>

  {#each data.contribTranslation as item}
    <MeDataItemContribTranslation item={item} />
  {/each}
</section>

<script lang="ts">
import MeDataItemContribOpenSource from "$/components/me/MeDataItemContribOpenSource.svelte";
import MeDataItemContribTranslation from "$/components/me/MeDataItemContribTranslation.svelte";
import MeDataItemProjectIndividual from "$/components/me/MeDataItemProjectIndividual.svelte";
import MeDataItemProjectTeam from "$/components/me/MeDataItemProjectTeam.svelte";
import type { PageProps } from "./$types";

const { data }: PageProps = $props();
</script>
