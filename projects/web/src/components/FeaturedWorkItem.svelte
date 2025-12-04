<div class="featured-work-item { additionalClassName }">
  <!-- Header image of the work -->
  <img class="w-full h-full object-cover bg-black"
       srcset={ getHeaderImageSrcSet() }
       src={ transformRemoteAssetPath(data.headerImageRemoteSrcSet?.[0]?.path) ?? encodedBlackImage }
       alt={ data.title } />

  <!-- Overlays -->
  <div class="overlay">
    <div class="overlay-content">
      <div></div>
      <div class="work-title">{ data.title }</div>
      <div class="work-association">{ (data as ProjectData).association ?? "개인 프로젝트" }</div>
    </div>
  </div>
</div>

<script lang="ts">
import { transformRemoteAssetPath } from "$/lib/utils";
import type { ProjectData } from "@somni.one/common";

const { data, additionalClassName }: { data: ProjectData, additionalClassName?: string } = $props();

const encodedBlackImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
const getHeaderImageSrcSet = () => data.headerImageRemoteSrcSet?.map(src => `${transformRemoteAssetPath(src.path)} ${src.scale ? `${src.scale}x` : ''}`).join(', ');
</script>

<style lang="scss" scoped>
@reference "$/styles/app.css";

.featured-work-item {
  @apply relative overflow-hidden h-64 rounded-3xl border border-solid border-background-inverse/20;
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
    @apply bg-linear-to-b from-transparent via-black/20 to-black/80;

    .overlay-content {
      @apply absolute left-0 right-0 bottom-0 w-full p-3;
      @apply text-white;
    }
  }

  .work-title {
    @apply text-2xl font-bold;
  }

  .work-association {
    @apply text-base opacity-70;
  }
}
</style>
