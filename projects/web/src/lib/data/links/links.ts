import { siX, siBluesky, siDiscord, siGithub, siMonkeytype, siSteam } from "simple-icons";
import { decodeEmailAddress } from "$/lib/data/email";
import faAt from "$assets/icons/fa-at-solid-full.svg?raw";
import faCircleCheck from "$assets/icons/fa-circle-check-solid-full.svg?raw";
import faCopy from "$assets/icons/fa-copy-solid-full.svg?raw";
import faCube from "$assets/icons/fa-cube-solid-full.svg?raw";
import faLinesLeaning from "$assets/icons/fa-lines-leaning-solid-full.svg?raw";
import faSquareArrowUp from "$assets/icons/fa-square-arrow-up-right-solid-full.svg?raw";
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
  private static icons = {
    email: faAt,
    twitter: siX.svg,
    bluesky: siBluesky.svg,
    discord: siDiscord.svg,
    blog: faLinesLeaning,
    github: siGithub.svg,
    solvedac: faCircleCheck,
    monkeytype: siMonkeytype.svg,
    steam: siSteam.svg,
    minecraft: faCube,
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

  public get iconHtml(): string | null {
    return LinkItem.icons[this.id] || null;
  }

  public get navIconHtml(): string | null {
    return this.id === "email" ? faCopy : faSquareArrowUp;
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
