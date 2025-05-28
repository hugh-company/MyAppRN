export interface Service {
  name: string;
  img: string;
  url: string;
  data?: ServiceData[];
  items?: any[];
  title?: string;
  hidden?: boolean;
  [key: string]: any;
}

export type ServiceData =
  | HeaderData
  | ServiceDomainData
  | ListDomainData
  | HostingTabsData
  | VpsTabsData
  | any;

export interface HeaderData {
  type: 'header';
  title: string;
  description: string;
  placeholder: string;
  [key: string]: any;
}

export interface ServiceDomainData {
  type: 'service_domain';
  title: string;
  items: ServiceDomainItem[];
  [key: string]: any;
}

export interface ServiceDomainItem {
  name: string;
  img: string;
  url: string;
  [key: string]: any;
}

export interface ListDomainData {
  type: 'list_domain';
  title: string;
  items: ListDomainItem[];
  [key: string]: any;
}

export interface ListDomainItem {
  ext: string;
  label: string;
  price: string;
  note?: string;
  [key: string]: any;
}

export interface HostingTabsData {
  type: 'hostingTabs';
  title: string;
  items: HostingTabItem[];
  [key: string]: any;
}

export interface HostingTabItem {
  name: string;
  img: string;
  url: string;
  title: string;
  items: HostingCategory[];
  [key: string]: any;
}

export interface HostingCategory {
  category?: string;
  name?: string;
  plans?: HostingPlan[];
  items?: HostingPlan[];
  [key: string]: any;
}

export interface HostingPlan {
  name: string;
  serviceId: string;
  price?: string;
  description?: string;
  img?: string;
  url?: string;
  [key: string]: any;
}
export interface VpsTabsData {
  type: 'vpsTabs';
  title: string;
  items: VpsTabItem[];
  [key: string]: any;
}
export interface VpsTabItem {
  name: string;
  img: string;
  url: string;
  title: string;
  items: VpsCategory[];
  [key: string]: any;
}
export interface VpsCategory {
  category?: string;
  name?: string;
  plans?: VpsPlan[];
  items?: VpsPlan[];
  [key: string]: any;
}
export interface VpsPlan {
  name: string;
  serviceId: string;
  price?: string;
  description?: string;
  img?: string;
  url?: string;
  [key: string]: any;
}
export enum ServiceType {
  DOMAIN = 'domain',
  HOSTING = 'hosting',
  VPS = 'vps',
  EMAIL = 'email',
  SSL = 'ssl',
  OTHER = 'other',
  PROMOTION = 'promotion',
  SERVICE = 'service',
  UNKNOWN = 'unknown',

  //
  HEADER_SEARCH = 'header_search',
  NAV_CONTROL = 'nav_control',
  LIST_DOMAIN = 'list_domain',
  TABS = 'tabs',
}
//
export interface itemDetailInterface {
  description: string;
  placeholder: string;
  title: string;
  type: ServiceType;
}
