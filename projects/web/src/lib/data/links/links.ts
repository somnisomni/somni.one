import { siBluesky, siDiscord, siGithub, siMonkeytype, siX } from "simple-icons";
import faAt from "$assets/icons/fa-at-solid-full.svg?raw";
import faCircleCheck from "$assets/icons/fa-circle-check-solid-full.svg?raw";
import faLinesLeaning from "$assets/icons/fa-lines-leaning-solid-full.svg?raw";
import LinkData from "./links.json";

export interface Link {
  labelKey: string;
  anchorTipKey: string;
  url: string;
  userId?: string;
  quickAccess?: boolean;
}

export interface LinkGroup {
  labelKey: string;
  items: Array<keyof typeof LinkData>;
}

export function getQuickAccessLinks(): Record<string, Link> {
  return Object.fromEntries(
    Object.entries(LinkData as Record<string, Link>).filter(([ , link ]) => link.quickAccess),
  );
}

export function getLinkIconSvg(linkId: string): string | null {
  return {
    email: faAt,
    twitter: siX.svg,
    bluesky: siBluesky.svg,
    discord: siDiscord.svg,
    blog: faLinesLeaning,
    github: siGithub.svg,
    solvedac: faCircleCheck,
    monkeytype: siMonkeytype.svg,
  }[linkId] || null;
}
