import LinkData from "./links.json";

export interface Link {
  labelKey: string;
  anchorTipKey: string;
  url: string;
  userId?: string;
  icon?: string;
  quickAccess?: boolean;
}

export interface LinkGroup {
  labelKey: string;
  items: Array<keyof typeof LinkData>;
}

export function getQuickAccessLinks(): Link[] {
  return Object.values(LinkData as Record<string, Link>)
    .filter(link => link.quickAccess);
}
