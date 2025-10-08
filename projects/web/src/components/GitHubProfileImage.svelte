<img class="github-avatar { elevate ? 'shadow-lg' : '' }"
     style="width: { size }rem; height: { size }rem;"
     src="https://github.com/{ githubLink.userId }.png"
     alt="GitHub @{ githubLink.userId } avatar" />

<script lang="ts">
import LinkData from "$/lib/data/links.json";
import type { Link } from "$lib/typings/links";

const githubLink = LinkData.github satisfies Link;

const { size = 8, elevate = false }: { size?: number, elevate?: boolean } = $props();
</script>

<style lang="scss">
@reference "$/styles/app.css";

.github-avatar {
  @apply rounded-full border-1 border-background-inverse/10;
}
</style>
