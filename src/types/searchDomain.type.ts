export interface ParamsSearchDomain {
  domain: string;
}

export interface DomainAvailability {
  domain: string; // Domain name
  isAvailable: boolean; // Availability status
  price: number; // Purchase price
  renewalPrice: number; // Renewal price
  sld: string; // Second-level domain
  tld: string; // Top-level domain
}

export interface ListPrefer {
  domains: DomainAvailability[];
}

export interface SearchDomainResponse {
  isAvailable: DomainAvailability;
  listPrefer: ListPrefer;
}
