export interface IDomainItemTitleSegment {
  text: string;
  description?: string;
  forceColor?: string;
}

export interface IDomainItem {
  title: IDomainItemTitleSegment[];
  href: string;
  subdomains?: ISubdomainItem[];
}

export interface ISubdomainItem extends Omit<IDomainItem, "title"> {
  title: string;
}
