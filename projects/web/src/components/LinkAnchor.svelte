<a class="link-anchor"
   href={ url }
   title={ title }
   onclick={ onAnchorClick }>
  {@render children?.()}
</a>

<script lang="ts">
import type { Snippet } from "svelte";
import type { Link } from "$lib/typings/links";
import LinkData from "$/lib/data/links.json";
import { _ } from "svelte-i18n";
import { decodeEmailAddress } from "$/lib/data/email";

const { children, linkId }: { children?: Snippet, linkId: keyof typeof LinkData } = $props();

const link = $derived((LinkData as Record<string, Link>)[linkId]) satisfies Link;
const url = $derived(linkId === "email" ? "#" : link.url);
const title = $derived(link.userId ? `${$_(link.labelKey)} (${link.userId})` : $_(link.labelKey));

async function onAnchorClick(event: Event) {
  if(linkId !== "email") return;
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
