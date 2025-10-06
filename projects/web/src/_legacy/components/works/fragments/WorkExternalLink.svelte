<a class="data-item-external-link"
   href="{url}"
   title="{url}">
  <span>🔗 {title}</span>
</a>

<script lang="ts">
const { url, title }: { url: string, title: string } = $props();
</script>

<style scoped>
@reference "$/styles/app.css";

.data-item-external-link {
  @apply inline-block font-light text-sky-900 mr-2;
  @apply transition-opacity opacity-50 hover:opacity-100;
}
</style>
