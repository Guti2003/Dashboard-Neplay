export interface PlatformStat {
  id: number;
  name: string;
  slug: string;
  color: string;
  totalAccounts: number;
}

export interface DashboardStats {
  platforms: PlatformStat[];
  totalProfiles: number;
  availableProfiles: number;
  occupiedProfiles: number;
}
