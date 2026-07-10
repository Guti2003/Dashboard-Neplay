export interface SearchPlatformRef {
  slug: string;
  name: string;
  color: string;
}

export interface SearchAccountResult {
  id: number;
  email: string;
  platform: SearchPlatformRef;
}

export interface SearchProfileResult {
  id: number;
  name: string;
  accountId: number;
  accountEmail: string;
  platform: SearchPlatformRef;
}

export interface SearchClientResult {
  id: number;
  name: string;
  phone: string;
}

export interface SearchResults {
  accounts: SearchAccountResult[];
  profiles: SearchProfileResult[];
  clients: SearchClientResult[];
}
