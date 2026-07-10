export interface Platform {
  id: number;
  name: string;
  slug: string;
  color: string;
  maxProfilesPerAccount: number | null;
  createdAt: string;
  updatedAt: string;
}
