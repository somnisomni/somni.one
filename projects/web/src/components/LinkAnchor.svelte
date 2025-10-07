<a class="link-anchor inline-block"
   href={ link.url }
   title={ title }>
  {@render children?.()}
</a>

<script lang="ts">
import type { Snippet } from "svelte";
import type { Link } from "$lib/typings/links";
import LinkData from "$lib/data/links.json";
import { _ } from "svelte-i18n";

const { children, linkId }: { children?: Snippet, linkId: keyof typeof LinkData } = $props();

const link = $derived((LinkData as Record<string, Link>)[linkId]) satisfies Link;
const title = $derived(link.userId ? `${$_(link.labelKey)} (${link.userId})` : $_(link.labelKey));
</script>
