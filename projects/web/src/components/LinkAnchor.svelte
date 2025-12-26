<svelte:element this={ link.url ? "a" : "div" }
                role={ link.url ? "link" : "listitem" }
                class="link-anchor"
                href={ url }
                title={ title }
                onclick={ onAnchorClick }>
  {@render children?.()}
</svelte:element>

<script lang="ts">
import type { Snippet } from "svelte";
import type { Link } from "$/lib/data/links/links";
import LinkData from "$/lib/data/links/links.json";
import { _ } from "svelte-i18n";
import { decodeEmailAddress } from "$/lib/data/email";

const { children, linkId }: { children?: Snippet, linkId: string } = $props();

const link = $derived((LinkData as Record<string, Link>)[linkId]);
const url = $derived(linkId === "email" ? "#" : link.url);
const title = $derived(link.userId ? `${$_(link.labelKey)} (${link.userId})` : $_(link.labelKey));

async function onAnchorClick(event: Event) {
  if(linkId !== "email" || !link.url) return;
  event.preventDefault();

  const email = decodeEmailAddress(link.url);
  await window.navigator.clipboard.writeText(email);

  alert($_("main.links.message.email-copied"));
}
</script>

<style lang="scss">
@reference "$/styles/app.css";

.link-anchor {
  @apply inline-flex items-center justify-center;
}
</style>
