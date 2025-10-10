<div class="featured-work-item { additionalClassName }">
  <picture>
    {#each data.headerImageRemotePaths as path}
      <source srcset={ `${import.meta.env.VITE_REMOTE_ASSETS_HOST_URL}/${path.startsWith('/') ? path.slice(1) : path}` }
              type={ getImageTypeFromPath(path) } />
    {/each}

    <!-- fallback or placeholder image here -->
  </picture>

  <div>{ data.title }</div>
</div>

<script lang="ts">
import type { ProjectDataBase } from "@somni.one/common";

const { data, additionalClassName }: { data: ProjectDataBase, additionalClassName?: string } = $props();

function getImageTypeFromPath(path: string) {
  const ext = path.split('.').pop()?.toLowerCase();

  switch(ext) {
    case 'avif': return 'image/avif';
    case 'webp': return 'image/webp';
    case 'jpg':
    case 'jpeg': return 'image/jpeg';
    case 'png': return 'image/png';
    case 'gif': return 'image/gif';
    default: return null;
  }
}
</script>

<style lang="scss" scoped>
@reference "$/styles/app.css";

picture {
  @apply block;
}
</style>
