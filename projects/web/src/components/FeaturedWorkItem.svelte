<div class="featured-work-item { additionalClassName }">
  <!-- Header image of the work -->
  <picture>
    {#each data.headerImageRemotePaths as path}
      <source srcset={ `${import.meta.env.VITE_REMOTE_ASSETS_HOST_URL}/${path.startsWith('/') ? path.slice(1) : path}` }
              type={ getImageTypeFromPath(path) } />
    {/each}

    <!-- fallback or placeholder image here -->
     <img class="w-full h-full object-cover" />
  </picture>

  <!-- Overlays -->
  <div class="overlay">
    <div class="overlay-content">
      <div></div>
      <div class="work-title">{ data.title }</div>
    </div>
  </div>
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

.featured-work-item {
  @apply relative overflow-hidden h-[16rem] rounded-3xl border-1 border-solid border-background-inverse/20;
  @apply transition-shadow duration-300 ease-in-out;

  &:hover {
    @apply shadow-xl;

    img {
      @apply scale-105;
    }
  }

  img {
    @apply transition-transform duration-300 ease-in-out;
  }

  .overlay {
    @apply absolute left-0 top-0 right-0 bottom-0 w-full h-full;
    @apply bg-gradient-to-b from-transparent via-transparent to-black/70;

    .overlay-content {
      @apply absolute left-0 right-0 bottom-0 w-full p-3;
      @apply text-white;
    }
  }

  .work-title {
    @apply text-2xl font-bold;
  }
}
</style>
