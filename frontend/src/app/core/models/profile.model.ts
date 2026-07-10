export type ProfileStatus = 'disponible' | 'ocupado';

export interface Profile {
  id: number;
  accountId: number;
  name: string;
  pin: string;
  status: ProfileStatus;
  assignedUser: string | null;
  assignedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileFormValue {
  name: string;
  pin: string;
  assignedUser: string;
}

export interface ListProfilesParams {
  search?: string;
  status?: ProfileStatus | '';
  sortBy?: 'name' | 'status' | 'createdAt';
  sortDir?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
}
