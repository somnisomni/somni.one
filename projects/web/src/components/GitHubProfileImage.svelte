<img class="github-avatar { elevate ? 'shadow-lg' : '' }"
     style="width: { size }rem; height: { size }rem;"
     src="https://github.com/{ githubLink.data.userId }.png"
     alt="GitHub @{ githubLink.data.userId } avatar" />

<script lang="ts">
import { links } from "$/lib/data/links/links";

const githubLink = links.github;

const { size = 8, elevate = false }: { size?: number, elevate?: boolean } = $props();
</script>

<style lang="scss">
@reference "$/styles/app.css";

.github-avatar {
  @apply rounded-full border border-background-inverse/10;
}
</style>
