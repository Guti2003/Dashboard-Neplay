import { Client } from './client.model';

export type ProfileStatus = 'disponible' | 'ocupado';

export interface Profile {
  id: number;
  accountId: number;
  name: string;
  pin: string;
  status: ProfileStatus;
  clientId: number | null;
  client: Client | null;
  assignedAt: string | null;
  daysRemaining: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileFormValue {
  name: string;
  pin: string;
  clientId: number | null;
}

export interface CreateProfilesBatchPayload {
  clientId: number;
  profiles: { name: string; pin: string }[];
}

export interface ListProfilesParams {
  search?: string;
  status?: ProfileStatus | '';
  sortBy?: 'name' | 'status' | 'createdAt';
  sortDir?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
}
