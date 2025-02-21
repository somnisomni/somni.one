export interface DomainItemTitleSegmentData {
  text: string;
  description?: string;
  forceColor?: string;
}

export interface DomainItemData {
  title: DomainItemTitleSegmentData[];
  href: string;
  subdomains?: SubdomainItemData[];
}

export interface SubdomainItemData extends Omit<DomainItemData, "title"> {
  title: string;
}
