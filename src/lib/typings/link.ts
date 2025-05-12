export interface Link {
  nameTextId: string;
  accountDisplayId: string;
  url: string;
  iconSlug?: string;
  commandSlugs?: string[];
}

export interface LinkCategory {
  nameTextId: string;
  links: Link[];
}
