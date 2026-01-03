<svelte:element this={ linkItem.normalizedUrl ? "a" : "div" }
                role={ linkItem.normalizedUrl ? "link" : "listitem" }
                class="link-anchor"
                href={ url }
                title={ title }
                onclick={ onAnchorClick }>
  {@render children?.()}
</svelte:element>

<script lang="ts">
import type { Snippet } from "svelte";
import { _ } from "svelte-i18n";
import { links } from "$/lib/data/links/links";
import type { LinkItem, LinkItemId } from "$/lib/data/links/links";

interface Props {
  children?: Snippet;
  link: LinkItemId | LinkItem;
}

const { children, link }: Props = $props();

const linkItem = $derived(typeof link === "string" ? links[link] : link);
const url = $derived(linkItem.id === "email" ? "#" : linkItem.normalizedUrl);
const title = $derived(linkItem.data.userId ? `${$_(linkItem.labelKey)} (${linkItem.data.userId})` : $_(linkItem.labelKey));

async function onAnchorClick(event: Event) {
  if(linkItem.id !== "email" || !linkItem.normalizedUrl) return;
  event.preventDefault();

  await window.navigator.clipboard.writeText(linkItem.normalizedUrl!);

  alert($_("main.links.message.email-copied"));
}
</script>

<style lang="scss">
@reference "$/styles/app.css";

.link-anchor {
  @apply inline-flex items-center justify-center;
}
</style>
