import type { Component } from "svelte";
import { SiBluesky, SiCrowdin, SiDiscord, SiGithub, SiMonkeytype, SiSteam, SiX } from "@icons-pack/svelte-simple-icons";
import { LucideAtSign, LucideCircleCheckBig, LucideCopy, LucideExternalLink, LucideNotebookText } from "@lucide/svelte";
import MinecraftAltIcon from "$/components/icons/IconMinecraftAlt.svelte";
import { decodeEmailAddress } from "$/lib/data/email";
import LinkData from "./links.json";

interface Link {
  /**
   * Localization parent key for the link item.
   *
   * - `{textParentKey}.label` - Label (name of the link)
   * - `{textParentKey}.anchorTip` - Tooltip text (for use in 'title' attribute)
   */
  textParentKey: string;

  url: string | null;
  userId?: string;
  userIdAlt?: string;
  quickAccess?: boolean;
}

export interface LinkGroup {
  labelKey: string;
  items: Array<keyof typeof LinkData>;
}

export type LinkItemId = keyof typeof LinkData;

export class LinkItem {
  private static icons: Record<string, Component> = {
    email: LucideAtSign,
    twitter: SiX,
    bluesky: SiBluesky,
    discord: SiDiscord,
    blog: LucideNotebookText,
    github: SiGithub,
    solvedac: LucideCircleCheckBig,
    monkeytype: SiMonkeytype,
    steam: SiSteam,
    minecraft: MinecraftAltIcon,
    crowdin: SiCrowdin,
  };

  constructor(
    public id: LinkItemId,
    public data: Link,
  ) { }

  public get labelKey(): string {
    return `${this.data.textParentKey}.label`;
  }

  public get anchorTipKey(): string {
    return `${this.data.textParentKey}.anchorTip`;
  }

  public get normalizedUrl(): string | null {
    return this.id === "email" && this.data.url ? decodeEmailAddress(this.data.url) : this.data.url;
  }

  public get component(): Component | null {
    return LinkItem.icons[this.id] || null;
  }

  public get navIconComponent(): Component | null {
    return this.id === "email" ? LucideCopy : LucideExternalLink;
  }
}

export const links = (() => {
  const _links: Record<string, LinkItem> = { };

  for(const [ key, data ] of Object.entries(LinkData as Record<keyof typeof LinkData, Link>)) {
    _links[key] = new LinkItem(key as keyof typeof LinkData, data);
  }

  return _links;
})();

export const quickAccessLinks = Object.entries(links)
  .filter(([ , link ]) => link.data.quickAccess)
  .map(([ , link ]) => link);
